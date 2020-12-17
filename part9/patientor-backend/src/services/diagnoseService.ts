import diagnoses from '../../data/diagnoses';

import { DiagnoseEntry } from '../types';

const getEntires = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

const addEntry = (entry: DiagnoseEntry): DiagnoseEntry => {
  const newDiagnoseEntry = {
    ...entry
  };
  diagnoses.push(newDiagnoseEntry);
  return newDiagnoseEntry;
};

export default {
  getEntires,
  addEntry
};