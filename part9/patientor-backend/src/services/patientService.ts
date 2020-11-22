import patients from '../../data/patients';

import { Patient, NonSensitivePatient } from '../types';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientEntires = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};


//Generating guids, https://stackoverflow.com/a/26502275
class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

const addEntry = (
  name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string
): Patient => {
  const newPatientEntry = {
    id: Guid.newGuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitivePatientEntires,
  addEntry
};