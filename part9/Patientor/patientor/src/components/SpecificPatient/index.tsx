import React, { useEffect, useState } from 'react';
import patientsService from '../../services/patients';
import { Patient } from '../../types';
import { useParams } from 'react-router-dom';
import Entry from './Entry';

interface PatientInfoProps {
  id: string;
}

const PatientInfo: React.FC<PatientInfoProps> = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams<{ id?: string }>();
  const fetchPatientData = async (id: string | undefined) => {
    if (id) {
      try {
        const patientData: Patient = await patientsService.getSpecificPatient(id);
        setPatient(patientData);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    }
  };

  useEffect(() => {
    fetchPatientData(id);
  }, [id]);

  return (
    <div>
      <h2>Patient Information</h2>
      {patient && (
        <ul>
          <li>Name: {patient.name}</li>
          <li>Gender: {patient.gender}</li>
          <li>Ssn: {patient.ssn ?? 'N/A'}</li>
          <li>Occupation: {patient.occupation}</li>
        </ul>
      )}

      {patient && patient.entries.length > 0 && (
        <div>
          <h3>Entries:</h3>
          <ul>
            {patient.entries.map((entry) => (
              <li key={entry.id}>
                <Entry entry={entry} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PatientInfo;
