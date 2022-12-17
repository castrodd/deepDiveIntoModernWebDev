import { NewPatientEntry } from "./types";
import { Gender } from "./types";

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

const parseGender = (gender: unknown):Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect type for gender!");
  }

  return gender;
};

type Fields = {name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};

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