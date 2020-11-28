import patients from '../../data/patients';

import { Patient, NewPatientEntry, NonSensitivePatient } from '../types';

import {v4 as uuidv4} from 'uuid';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientEntires = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const getFullPatient = (entry: string) => {
  return  patients.find(p => p.id === entry);
};

const addEntry = (entry: NewPatientEntry): Patient => {
  const createId: string = uuidv4();
  const newPatientEntry = {
    id: createId,
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitivePatientEntires,
  addEntry,
  getFullPatient
};