import { NewPatientEntry } from "./types";
import { Entry, Gender } from "./types";

const parseStringField = (field: unknown) => {
  if (!field || !isString(field)) {
    throw new Error("Incorrect type for field!");
  }

  return field;
};

const isString = (text: unknown): text is string => {
  return typeof text == "string" || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (str: any): str is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(str);
};

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect type for gender!");
  }

  return gender;
};

export const extractGender = (entry: NewPatientEntry): string => {
  const { gender } = entry;
  return gender;
};

export const checkPatientEntryType = (entry: Entry): boolean => {
  switch (entry.type) {
    case "HealthCheck":
      if (entry.healthCheckRating) return true;
      return false;
    case "Hospital":
      if (entry.discharge) return true;
      return false;
    case "OccupationalHealthCare":
      if (entry.employerName) return true;
      return false;
    default:
      console.log("Failed patient entry validation!!!");
      return false;
  }
};

type Fields = {
  name: unknown, 
  dateOfBirth: unknown, 
  ssn: unknown, 
  gender: unknown, 
  occupation: unknown
};

const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseStringField(name),
    dateOfBirth: parseStringField(dateOfBirth),
    ssn: parseStringField(ssn),
    gender: parseGender(gender),
    occupation: parseStringField(occupation)
  };

  return newEntry;
};

export default toNewPatientEntry;