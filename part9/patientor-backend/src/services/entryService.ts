import {
  Entry,
  Patient,
} from '../types';

import { toNewEntry } from '../utils';

const addEntry = (entry: Entry, patient?: Patient): Entry => {
  console.log(entry);
  console.log(typeof(entry.diagnosisCodes));
  const parsedEntry = toNewEntry(entry);

  try {
    patient?.entries.push(parsedEntry);
    return entry;
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
    return e.message;
  }
};

export default {
  addEntry
};