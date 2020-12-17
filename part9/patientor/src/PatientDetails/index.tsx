import Axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { setPatient, useStateValue } from '../state';

const PatientDetails: React.FC = () => {
  const [{ patients, diagnoses }] = useStateValue();
  const [, dispatch] = useStateValue();
  const { id } = useParams<Record<string, string | undefined>>();
  const patient = Object.values(patients).find(p => p.id === id);

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await Axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatient();
  }, [id, dispatch]);

  
  const genderIcon = () => {
    if (patient) {
      if (patient.gender === "male") {
        return <Icon name="mars" />;
      } else if (patient.gender === "female") {
        return <Icon name="venus" />;
      } else {
        return <Icon name="other gender" />;
      }
    }
  };

  const diagnoseName = (diagnoseCode: string): string => {
    const diagnose = Object.values(diagnoses).find(d => d.code === diagnoseCode);
    return (diagnose?.name || '');
  };

  if (patient) {
    return (
      <div>
        <h2>{patient.name} {genderIcon()} </h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h3>entries</h3>
        {patient.entries.map(entry => {
          return (
            <div key={entry.id}>
              <p>{entry.date} {entry.description}</p>
              <ul>
                {entry.diagnosisCodes?.map(diagnose => {
                  return(
                  <li key={diagnose}>{diagnose} {diagnoseName(diagnose)}</li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <p>
          Unable to retrieve patient
        </p>
      </div>
    );
  }
};

export default PatientDetails;