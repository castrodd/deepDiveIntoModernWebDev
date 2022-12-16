import patientsData from '../data/patients.json';
import { NonSensitivePatientEntry, PatientEntry } from '../types';

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

export default {
  getEntries,
  getNonSensitiveEntries,
  findById
};