import React, { useEffect, useState } from 'react';
import patientsService from '../../services/patients';
import { Patient } from '../../types';
import { useParams } from 'react-router-dom';


interface PatientInfoProps {
  id: string;
}

const PatientInfo: React.FC<PatientInfoProps> = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id = '' } = useParams<{ id: string }>();
  const fetchPatientData = async (id: string) => {
    try {
      const patientData: Patient = await patientsService.getSpecificPatient(id);
      setPatient(patientData);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  useEffect(() => {
    fetchPatientData(id);
  }, [id]);

  return (
    <div>
      <h2>Patient Information</h2>
      {patient ? (
        <ul>
          <li>Name: {patient.name}</li>
          <li>Date of Birth: {patient.dateOfBirth}</li>
          <li>Gender: {patient.gender}</li>
          <li>Ssn: {patient.ssn}</li>
          <li>Occupation: {patient.occupation}</li>
        </ul>
      ) : (
        <p>Loading patient data...</p>
      )}
    </div>
  );
};

export default PatientInfo;