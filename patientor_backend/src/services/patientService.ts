import { v1 as uuid } from "uuid";
import patients from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";

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

export default {
  getPatientEntries,
  getNonSensitivePatientEntries,
  addPatient,
  findById,
};
