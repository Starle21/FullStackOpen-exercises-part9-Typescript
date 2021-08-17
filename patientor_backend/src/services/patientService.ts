import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  NewEntryWithoutId,
  Entry,
} from "../types";

// const patients: Array<Patient> = patientData;

const getPatientEntries = (): Array<Patient> => {
  return patients;
};
const getNonSensitivePatientEntries = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (entry: NewPatient): Patient => {
  const id = uuid();
  const newPatient = { ...entry, id: id };
  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

const addRecord = (entry: NewEntryWithoutId, patient: Patient): Entry => {
  const id = uuid();
  const newEntry = { ...entry, id: id };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatientEntries,
  getNonSensitivePatientEntries,
  addPatient,
  findById,
  addRecord,
};
