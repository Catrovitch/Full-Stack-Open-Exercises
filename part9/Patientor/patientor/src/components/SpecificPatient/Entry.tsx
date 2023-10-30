import React, { useEffect, useState } from 'react';
import { Entry as EntryType, HealthCheckRating, Diagnosis } from '../../types';
import diagnosesService from '../../services/diagnoses';

interface EntryProps {
  entry: EntryType;
}

const Entry: React.FC<EntryProps> = ({ entry }) => {
    const [diagnosisNames, setDiagnosisNames] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchNames = async () => {
          if (entry.diagnosisCodes && entry.diagnosisCodes.length > 0) {
            const promises = entry.diagnosisCodes.map((code) =>
              diagnosesService.getSpecificDiagnosis(code)
            );
      
            try {
              const results = await Promise.all(promises);
              const names: { [code: string]: string } = {};
      
              for (let i = 0; i < entry.diagnosisCodes.length; i++) {
                const code = entry.diagnosisCodes[i];
                const result = results[i];
                names[code] = result.name;
              }
      
              setDiagnosisNames(names);
            } catch (error) {
              console.error('Error fetching diagnosis names:', error);
            }
          }
        };
      
        fetchNames();
      }, [entry.diagnosisCodes]);
    
    
  switch (entry.type) {
    case 'Hospital':
      return (
        <div>
          <p>{entry.date} <em>{entry.description}</em></p>
          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
            <ul>
                <li>Diagnosis Codes:</li>
                <ul>
                {entry.diagnosisCodes.map((code, index) => (
                    <li key={index}>
                    {code} - {diagnosisNames[code]}
                    </li>
                ))}
                </ul>
            </ul>
            )}
          <p>Specialist: {entry.specialist}</p>
          <p>Discharge Date: {entry.discharge.date}</p>
          <p>Discharge Criteria: {entry.discharge.criteria}</p>
        </div>
      );
    case 'OccupationalHealthcare':
        return (
            <div>
              <p>{entry.date} <em>{entry.description}</em></p>
              {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
            <ul>
                <li>Diagnosis Codes:</li>
                <ul>
                {entry.diagnosisCodes.map((code, index) => (
                    <li key={index}>
                    {code} - {diagnosisNames[code]}
                    </li>
                ))}
                </ul>
            </ul>
            )}
              <p>Specialist: {entry.specialist}</p>
              <p>Employer: {entry.employerName}</p>
              {entry.sickLeave && (
                <p>
                  Sick Leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
                </p>
              )}
            </div>
          );
          
    case 'HealthCheck':
        return (
            <div>
              <p>{entry.date} <em>{entry.description}</em></p>
                {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                <ul>
                    <li>Diagnosis Codes:</li>
                    <ul>
                    {entry.diagnosisCodes.map((code, index) => (
                        <li key={index}>
                        {code} - {diagnosisNames[code]}
                        </li>
                    ))}
                    </ul>
                </ul>
                )}
              <p>Specialist: {entry.specialist}</p>
              <p>Health Check Rating: {HealthCheckRating[entry.healthCheckRating]}</p>
            </div>
          );
    default:
      return null;
  }
};

export default Entry;
