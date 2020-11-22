import diagnoses from '../../data/diagnoses';

import { DiagnoseEntry } from '../types';

const getEntires = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

const addEntry = (): null => {
  return null;
};

export default {
  getEntires,
  addEntry
};