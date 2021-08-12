import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";

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

const addPatient = (entry: NewPatient): Patient => {
  const id = uuid();
  const newPatient = { ...entry, id: id };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatientEntries,
  getNonSensitivePatientEntries,
  addPatient,
};
