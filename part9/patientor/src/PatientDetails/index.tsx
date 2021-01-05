import axios from 'axios';
import React from 'react';
import CSS from 'csstype';
import { useParams } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { Patient, Entry, OccupationalHealthcareEntry, Diagnosis, HealthCheckEntry, HospitalEntry } from '../types';
import { setPatient, useStateValue } from '../state';
import AddEntryForm from '../AddEntryModal';
import { HealthCheckEntryValues } from '../AddEntryModal/AddEntryForm';
import { addEntry } from "../state";

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
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<Record<string, string | undefined>>();
  const patient = Object.values(patients).find(p => p.id === id);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: HealthCheckEntryValues) => {
    console.log(values);
    if (patient) {
      try {
        const { data: newEntry } = await axios.post<HealthCheckEntry>(
          `${apiBaseUrl}/patients/${patient?.id}/entries`,
          values
        );
        console.log(newEntry);
        dispatch(addEntry(newEntry, patient.id));
        closeModal();
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data.error);
      }
    }
  };


  if (patient) {
    return (
      <div>
        <h2>{patient.name} {genderIcon()} </h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h3>entries
          <AddEntryForm
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal} />
          <Button color="blue" onClick={() => openModal()}>Add New Entry</Button>
        </h3>
        {patient.entries.map(entry => {
          return <EntryDetails key={entry.id} entry={entry} diagnoses={Object.values(diagnoses)} />;
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

const assertNever = (value: unknown): never => {
  throw new Error(`Unhandled value: ${value}`);
};

const EntryDetails: React.FC<{
  entry:
  Entry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {

  const diagnosisArray = diagnoses.filter(diagnose => entry.diagnosisCodes?.includes(diagnose.code));

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
            <div key={diagnose.code} >
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
          <div style={diagnosisEntryStyle} key={diagnose.code}>
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

  const colour = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return "green";
      case 1:
        return "olive";
      case 2:
        return "orange";
      case 3:
        return "red";
      default:
        return "black";
    }
  };

  return (
    <div key={entry.id} style={divStyles}>
      <h3 style={headingStyle}>{entry.date} <Icon name="heart" size="big" color={colour()} /> </h3>

      <p style={diagnosisDescriptionStyle}>{entry.description}</p>

      {diagnosisArray?.map(diagnose => {
        return (
          <div style={diagnosisEntryStyle} key={diagnose.code}>
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