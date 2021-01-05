import { State } from "./state";
import { Diagnosis, Patient, HealthCheckEntry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    //Update one patients
      type: "SET_PATIENT";
      payload: Patient;
  }
  | {
    type: "SET_DIAGNOSES";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_DIAGNOSIS";
    payload: Diagnosis;
  }
  | {
    type: "ADD_ENTRY";
    payload: HealthCheckEntry;
    patient: string;
  };

  export const setPatientList = (patients: Patient[]): Action => {
    return {
      type: "SET_PATIENT_LIST",
      payload: patients
    };
  };

  export const addPatient = (patient: Patient): Action => {
    return {
      type: "ADD_PATIENT",
      payload: patient
    };
  };

  export const setPatient = (patient: Patient): Action => {
    return {
      type: "SET_PATIENT",
      payload: patient
    };
  };

  export const setDiagnoses = (diagnoses: Diagnosis[]): Action => {
    return {
      type: "SET_DIAGNOSES",
      payload: diagnoses
    };
  };

  export const addDiagnose = (diagnose: Diagnosis): Action => {
    return {
      type: "ADD_DIAGNOSIS",
      payload: diagnose
    };
  };

  export const addEntry = (entry: HealthCheckEntry, patient: string): Action => {
    return {
      type: "ADD_ENTRY",
      payload: entry,
      patient: patient
    };
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({...memo, [diagnose.code]: diagnose}),
            {}
          ),
          ...state.diagnoses
        }
      };
      case "ADD_DIAGNOSIS":
        return {
          ...state,
          diagnoses: {
            ...state.diagnoses,
            [action.payload.code]: action.payload
          }
        };
      case "ADD_ENTRY":
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.patient]: {
              ...state.patients[action.patient],
              entries: [
                ...state.patients[action.patient].entries,
                action.payload
              ]
            }
          }
        };
    default:
      return state;
  }
};
