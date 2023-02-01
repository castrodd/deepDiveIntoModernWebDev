import patients from '../data/patients';
import { NewPatientEntry, 
  NonSensitivePatientEntry, 
  PatientEntry,
  Entry,
  Patient, 
  Gender} from '../types';
import { v1 as uuid } from 'uuid';
import { extractGender, parseGender, checkPatientEntryType } from "../utils";

const patientEntries: Array<Patient> = patients;

const getEntries = (): PatientEntry[] => {
  return patientEntries;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientEntries.map(({ 
    id,
    name,
    dateOfBirth,
    gender,
    occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation 
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patientEntries.find(d => d.id === id);
  if (entry) {
    const gender = entry.gender == "male" ? Gender.Male : Gender.Female;
    const entries = !entry.entries ? [] : entry.entries;
    
    return { ...entry, gender, entries};
  }

  return undefined;
};

const addEntry = (entry: NewPatientEntry): Patient => {
    const stringGender = extractGender(entry);
    let parsedGender = parseGender(stringGender);

    const checkedEntries = entry.entries ? entry.entries : [];

    const newPatientEntry = {
      ...entry,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      id: String(uuid()),
      gender: parsedGender,
      entries: checkedEntries
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addEntryToPatientEntries = (id: string, entry: Entry): Entry | undefined => {
  const patient = patientEntries.find(d => d.id === id);
  if (patient && checkPatientEntryType(entry)) {
    patient.entries.push(entry);
    return entry;
  }

  return undefined;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addEntry,
  addEntryToPatientEntries
};