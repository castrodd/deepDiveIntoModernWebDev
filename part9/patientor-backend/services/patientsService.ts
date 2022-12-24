import patientEntries from '../data/patientsData';
import { NewPatientEntry, 
  NonSensitivePatientEntry, 
  PatientEntry,
  Patient, 
  Gender} from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<PatientEntry> = patientEntries;

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

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(d => d.id === id);
  if (entry) {
    const gender = entry.gender == "male" ? Gender.Male : Gender.Female;
    const entries = !entry.entries ? [] : entry.entries;
    
    return { ...entry, gender, entries};
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