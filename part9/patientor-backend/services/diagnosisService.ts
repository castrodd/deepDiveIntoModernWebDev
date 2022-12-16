import diagnosisData from '../data/diagnoses.json';
import { DiagnosisEntry } from '../types';

const diagnoses: Array<DiagnosisEntry> = diagnosisData as Array<DiagnosisEntry>;

const getEntries = (): DiagnosisEntry[] => {
  return diagnoses;
};

export default {
  getEntries,
};