import patients from "../../data/patients";
import { Patient, NonSensitivePatient } from "../types";

// const patients: Array<Patient> = patientData;

const getPatientEntries = (): Array<Patient> => {
  return patients;
};
const getNonSensitivePatientEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatientEntries,
  getNonSensitivePatientEntries,
};
