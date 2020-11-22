import patients from '../../data/patients';

import { Patient } from '../types';

const getEntries = (): Array<Patient> => {
  return patients;
};

const addEntry = (): null => {
  return null;
};

export default {
  getEntries,
  addEntry
};