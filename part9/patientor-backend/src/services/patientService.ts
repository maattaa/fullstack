import patients from '../../data/patients';

import { Patient, NonSensitivePatient } from '../types';

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatientEntires = (): NonSensitivePatient [] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addEntry = (): null => {
  return null;
};

export default {
  getEntries,
  getNonSensitivePatientEntires,
  addEntry
};