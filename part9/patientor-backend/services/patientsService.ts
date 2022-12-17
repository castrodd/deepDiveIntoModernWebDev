import patientsData from '../data/patients.json';
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<PatientEntry> = patientsData as Array<PatientEntry>;

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ 
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

const findById = (id: string): NonSensitivePatientEntry | undefined => {
  const entry = patients.find(d => d.id === id);
  if (entry) {
    const { id, name, dateOfBirth, gender, occupation} = entry;
    return ({ id, name, dateOfBirth, gender, occupation });
  }

  return undefined;
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      id: String(uuid()),
      ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addEntry
};