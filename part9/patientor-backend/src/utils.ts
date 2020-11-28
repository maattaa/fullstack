import { NewPatientEntry, Gender } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseString = (text: any, argument: string): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${argument}: ${String(text)}`);
  }

  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing date: ${String(date)} `);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${String(gender)}`);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return gender;
};


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    name: parseString(object.name, 'name'),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    dateOfBirth: parseDate(object.dateOfBirth),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ssn: parseString(object.ssn, 'ssn'),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    gender: parseGender(object.gender),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    occupation: parseString(object.occupation, 'occupation'),
    entries: []
  };
};

export default toNewPatientEntry;