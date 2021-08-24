import {
  NewPatient,
  Gender,
  EntryType,
  NewEntryWithoutId,
  Diagnose,
  HealthCheckRating,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing date: " + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatient => {
  const newPatientEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [],
  };
  return newPatientEntry;
};

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const isEntry = (param: any): param is Entry[] => {
//   return Object.values(EntryType).includes(param.type);
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

const parseType = (type: unknown): EntryType => {
  if (!type || !isType(type)) {
    throw new Error("Incorrect or missing entry type");
  }
  return type;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("Incorrect or missing entry description");
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};
const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Incorrect or missing entry specialist");
  }
  return specialist;
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnose["code"]> => {
  if (!Array.isArray(codes) || !codes.map((code) => isString(code))) {
    throw new Error("Incorrect or missing entry of Diagnoses");
  }
  return codes as Array<Diagnose["code"]>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheck = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheck = (rating: unknown): HealthCheckRating => {
  if (rating === undefined || !isHealthCheck(rating)) {
    throw new Error("Incorrect or missing health check rating: " + rating);
  }
  return rating;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Incorrect or missing employer's name: " + employerName);
  }
  return employerName;
};

function parseCriteria(criteria: unknown): string {
  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing discharge criteria");
  }
  return criteria;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toPatientMedicalRecord = (newEntry: any): NewEntryWithoutId => {
  const newEntryParsed = {
    type: parseType(newEntry.type),
    description: parseDescription(newEntry.description),
    date: parseDate(newEntry.date),
    specialist: parseSpecialist(newEntry.specialist),
  } as NewEntryWithoutId;

  if (newEntry.diagnosisCodes) {
    newEntryParsed.diagnosisCodes = parseDiagnosisCodes(
      newEntry.diagnosisCodes
    );
  }

  switch (newEntryParsed.type) {
    case EntryType.HealthCheck:
      newEntryParsed.healthCheckRating = parseHealthCheck(
        newEntry.healthCheckRating
      );
      return newEntryParsed;

    case EntryType.OccupationalHealthcare:
      newEntryParsed.employerName = parseEmployerName(newEntry.employerName);

      if (newEntry.sickLeave) {
        newEntryParsed.sickLeave = {
          startDate: parseDate(newEntry.sickLeave.startDate),
          endDate: parseDate(newEntry.sickLeave.endDate),
        };
      }
      return newEntryParsed;

    case EntryType.Hospital:
      newEntryParsed.discharge = {
        date: parseDate(newEntry.discharge.date),
        criteria: parseCriteria(newEntry.discharge.criteria),
      };
      return newEntryParsed;

    default:
      return assertNever(newEntryParsed);
  }
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
