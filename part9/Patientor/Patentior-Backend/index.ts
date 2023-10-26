import express from 'express';
import diagnoses from './data/diagnoses';
import patients from './data/patients';
import cors from 'cors';
import { PatientWithoutSsn } from './types';

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


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});