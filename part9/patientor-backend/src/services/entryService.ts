import { Entry, Patient } from '../types';
import {v4 as uuidv4} from 'uuid';

const addEntry = (entry: Entry, patient?: Patient): Entry => {
  const newEntry = {
    ...entry,
    id: uuidv4()
  };
  patient?.entries.push(newEntry);
  return entry;
};

export default {
  addEntry
};