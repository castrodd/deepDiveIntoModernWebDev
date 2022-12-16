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

export default {
  getEntries,
  getNonSensitiveEntries
};