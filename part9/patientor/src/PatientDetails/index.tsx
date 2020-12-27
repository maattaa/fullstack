import Axios from 'axios';
import React from 'react';
import CSS from 'csstype';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { Patient, Entry, OccupationalHealthcareEntry, Diagnosis, HealthCheckEntry, HospitalEntry } from '../types';
import { setPatient, useStateValue } from '../state';

const divStyles: CSS.Properties = {
  color: 'darkgrey',
  border: '1px solid grey',
  borderRadius: '5px',
  marginBottom: '20px',
  boxShadow: '2px 4px',
};

const headingStyle: CSS.Properties = {
  color: 'black',
  fontWeight: 'bold',
  margin: '10px'
};

const diagnosisDescriptionStyle: CSS.Properties = {
  color: 'dimgray ',
  fontStyle: 'italic',
  margin: '10px'
};

const diagnosisEntryStyle: CSS.Properties = {
  color: 'dimgray ',
  fontStyle: 'normal',
  paddingLeft: '10px'
};

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

  /*   const diagnoseName = (diagnoseCode: string): string => {
      const diagnose = Object.values(diagnoses).find(d => d.code === diagnoseCode);
      return (diagnose?.name || '');
    }; */

  if (patient) {
    return (
      <div>
        <h2>{patient.name} {genderIcon()} </h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h3>entries</h3>
        {patient.entries.map(entry => {
          return <EntryDetails key={entry.id} entry={entry} diagnoses={Object.values(diagnoses)} />;

          /*           return (
                      <div key={entry.id}>
                        <p>{entry.date} {entry.description}</p>
                        <ul>
                          {entry.diagnosisCodes?.map(diagnose => {
                            return (
                              <li key={diagnose}>{diagnose} {diagnoseName(diagnose)}</li>
                            );
                          })}
                        </ul>
                      </div>
                    ); */
        })}
      </div >
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

//These should be moved into separate file if used somewhere else than here

/* const diagnoseNameSeparate: React.FC<{diagnoseCode: Entry["diagnosisCodes"]}> = ({diagnoseCode}) => {
  const [{ diagnoses }] = useStateValue();
  const diagnose = Object.values(diagnoses).find(d => d.code === diagnoseCode);
  return (diagnose?.name || '');
}; */

const assertNever = (value: unknown): never => {
  throw new Error(`Unhandled value: ${value}`);
};

const EntryDetails: React.FC<{
  entry:
  Entry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {

  const diagnosisArray = diagnoses.filter(diagnose => entry.diagnosisCodes?.includes(diagnose.code));
  /*   entry.diagnosisCodes?.map(code => {
      diagnoses.find(d => d.code === code);
    }); */

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryRecord entry={entry} diagnosisArray={diagnosisArray} />;
    case "OccupationalHealthcare":
      return <OccupationalEntryRecord entry={entry} diagnosisArray={diagnosisArray} />;
    case "HealthCheck":
      return <HealthCheckEntryRecord entry={entry} diagnosisArray={diagnosisArray} />;
    default:
      return assertNever(entry);
  }
};

const HospitalEntryRecord: React.FC<{ entry: HospitalEntry; diagnosisArray: Diagnosis[] }> = ({ entry, diagnosisArray }) => {
  return (
    <div key={entry.id} style={divStyles}>
      <h3 style={headingStyle}>{entry.date} <Icon name="doctor" size="big" /> </h3>
      <div style={diagnosisEntryStyle}>
        {diagnosisArray?.map(diagnose => {
          return (
            <div >
              <p>{diagnose.code} <i>{diagnose.latin}</i> <br></br>
                {diagnose.name}</p>
              <p></p>
            </div>
          );
        })}
        <p>{entry.description}</p>
        <p>Left hopsital on <b>{entry.discharge.date}</b></p>
        <p>{entry.discharge.criteria}</p>

      </div>
    </div>
  );
};

const OccupationalEntryRecord: React.FC<{ entry: OccupationalHealthcareEntry; diagnosisArray: Diagnosis[] }> = ({ entry, diagnosisArray }) => {
  const leaveDates = entry.sickLeave
    ? <p style={diagnosisDescriptionStyle}>
      Off duty: <b>{entry.sickLeave.startDate} - {entry.sickLeave.endDate}</b></p>
    : null;

  return (
    <div key={entry.id} style={divStyles}>
      <h3 style={headingStyle}>{entry.date} <Icon name="briefcase" size="big" />
        {entry.employerName} </h3>
      {diagnosisArray?.map(diagnose => {
        return (
          <div style={diagnosisEntryStyle}>
            <p>{diagnose.code} <i>{diagnose.latin}</i> <br></br>
              {diagnose.name}</p>
            <p></p>
          </div>
        );
      })}

      <p style={diagnosisDescriptionStyle}>{entry.description}</p>

      {leaveDates}
    </div>
  );
};

const HealthCheckEntryRecord: React.FC<{ entry: HealthCheckEntry; diagnosisArray: Diagnosis[] }> = ({ entry, diagnosisArray }) => {

  const color = entry.healthCheckRating === 1 ? "orange" : "green";

  return (
    <div key={entry.id} style={divStyles}>
      <h3 style={headingStyle}>{entry.date} <Icon name="heart" size="big" color={color} /> </h3>

      <p style={diagnosisDescriptionStyle}>{entry.description}</p>

      {diagnosisArray?.map(diagnose => {
        return (
          <div style={diagnosisEntryStyle}>
            <p>{diagnose.code} <b></b>
              <i>{diagnose.latin}</i> <b></b>
              {diagnose.name}</p>
          </div>
        );
      })}
    </div>
  );
};


export default PatientDetails;