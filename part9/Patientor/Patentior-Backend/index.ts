import express from 'express';
import { v1 as uuid } from 'uuid';
import diagnoses from './data/diagnoses';
import patients from './data/patients';
import cors from 'cors';
import { PatientWithoutSsn, Patient, PatientFormValues } from './types';
import toNewPatientEntry from './utils';

const app = express();
app.use(cors());
app.use(express.json());


const PORT = 3001;


app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  console.log('Getting Diagnoses...');
  res.json(diagnoses);
});

app.get('/api/patients', (_req, res) => {
  console.log('Getting Patients...');

  // Map the patient data to exclude "ssn" using the utility type
  const patientsWithoutSsn: PatientWithoutSsn[] = patients.map((patient) =>
    (({ id, name, dateOfBirth, occupation, gender }) => ({ id, name, dateOfBirth, occupation, gender }))(patient)
  );

  res.json(patientsWithoutSsn); // Send the JSON response with only selected fields
});

app.get('/api/patient/:id', (req, res) => {
  const id = String(req.params.id); // Convert id to a number

  const patientsWithoutSsn: PatientWithoutSsn[] = patients.map((patient) =>
    (({ id, name, dateOfBirth, occupation, gender }) => ({ id, name, dateOfBirth, occupation, gender }))(patient)
  );

  const findById = (id: string): PatientWithoutSsn | undefined => {
    const entry = patientsWithoutSsn.find((d) => d.id === id);
    return entry;
  };

  const patientToFind = findById(id);

  if (patientToFind) {
    res.json(patientToFind);
  } else {
    res.status(404).send('Patient not found');
  }
});

app.post('/api/patients', (req, res) => {
  console.log('Adding patient');
  console.log('Body: ', req.body);
  const patientToAdd: PatientFormValues = toNewPatientEntry(req.body);
  const id: string = uuid();

  const patient: Patient = { ...patientToAdd, id };

  patients.push(patient);

  console.log('Patient added');
  res.send(patient);
});




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});