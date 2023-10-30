import React from 'react';
import { Entry as EntryType, HealthCheckRating } from '../../types';

interface EntryProps {
  entry: EntryType;
}

const Entry: React.FC<EntryProps> = ({ entry }) => {
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
                    <li key={index}>{code}</li>
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
                      <li key={index}>{code}</li>
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
                      <li key={index}>{code}</li>
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
