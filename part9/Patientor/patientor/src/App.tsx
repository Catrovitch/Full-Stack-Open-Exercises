import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient, Diagnosis } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import SpecificPatient from "./components/SpecificPatient";

import diagnosesService from "./services/diagnoses";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<JSON>(`${apiBaseUrl}/patients`);
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      console.log();
      setPatients(patients);
    };
    fetchPatientList();
  }, []);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
  });
  
  useEffect(() => {
    void axios.get<JSON>(`${apiBaseUrl}/diagnoses`);
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    fetchDiagnosesList();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<h2>Home</h2>}/>
            <Route path="/patients" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/diagnoses" element={<h2>Diagnoses</h2>}/>
            <Route path="/ping" element={<h2>Ping</h2>}/>
            <Route path="/patient/:id" element={<SpecificPatient/>} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
