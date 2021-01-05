/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  NewPatientEntry,
  Gender,
  HealthCheckRatingEnum,
  EntryType,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  BaseEntry
} from './types';
import { v4 as uuidv4 } from 'uuid';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown, argument: string): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing ${argument}: ${String(text)}`);
  }
  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${String(date)} `);
  }
  return date;
};

//param as Gender from https://github.com/microsoft/TypeScript/issues/33200#issuecomment-527670779
const isGender = (param: string): param is Gender => {
  return Object.values(Gender).includes(param as Gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${String(gender)}`);
  }
  return gender;
};

const isHealthCheckEntry = (param: unknown): param is HealthCheckRatingEnum => {
  return Object.values(HealthCheckRatingEnum).includes(param as HealthCheckRatingEnum);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRatingEnum => {
  if (!isHealthCheckEntry(healthCheckRating)) {
    throw new Error(`Incorrect or missing HealthCheckRating: ${String(healthCheckRating)}`);
  }
  return healthCheckRating;
};

const isArrayOfStrings = (param: unknown): param is string[] => {
  return Array.isArray(param) && param.every((value: unknown) => typeof value === 'string');
};

const parseDiagnosisCodes = (value: unknown): string[] => {
  if (!value) {
    return [];
  }
  if (!isArrayOfStrings(value)) {
    throw new Error(`Incorrect or missing diagnosis codes: ${String(value)}`);
  }
  return value;
};

const isEntryType = (param: unknown): param is EntryType => {
  return Object.values(EntryType).includes(param as EntryType);
};

const parseEntryType = (entryType: unknown): EntryType => {
  if (!entryType || !isEntryType(entryType)) {
    throw new Error(`Incorrect or missing Entry type: ${String(entryType)}`);
  }
  return entryType;
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {

    name: parseString(object.name, 'name'),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn, 'ssn'),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, 'occupation'),
    entries: []
  };
};

export const toNewEntry = (entry: any): Entry => {
  const type = parseEntryType(entry.type);

  const parsedBaseEntry: BaseEntry = {
    id: uuidv4(),
    description: parseString(entry.description, 'description'),
    date: parseDate(entry.date),
    specialist: parseString(entry.specialist, 'specialist'),
    diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes)
  };

  switch (type) {
    case EntryType.HealthCheck:
      const parsedHealthCheckEntry: HealthCheckEntry = {
        ...parsedBaseEntry,
        type: EntryType.HealthCheck,
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
      };
      return parsedHealthCheckEntry;
    case EntryType.Hospital:
      const parsedHospitalEntry: HospitalEntry = {
        ...parsedBaseEntry,
        type: EntryType.Hospital,
        discharge: {
          date: parseDate(entry.discharge.date),
          criteria: parseString(entry.discharge.criteria, 'discharge.criteria')
        }
      };
      return parsedHospitalEntry;
    case EntryType.OccupationalHealthcare:
      const parsedOccupationalEntry: OccupationalHealthcareEntry = {
        ...parsedBaseEntry,
        type: EntryType.OccupationalHealthcare,
        employerName: parseString(entry.employerName, 'employerName')
      };
      if (entry.sickLeave) {
        const parsedOccupationalEntryWithLeave: OccupationalHealthcareEntry = {
          ...parsedOccupationalEntry,
          sickLeave: {
            startDate: parseDate(entry.sickLeave.startDate),
            endDate: parseDate(entry.sickLeave.endDate)
          }
        };
        return parsedOccupationalEntryWithLeave;
      }
      return parsedOccupationalEntry;
  }


};

export default toNewPatientEntry;