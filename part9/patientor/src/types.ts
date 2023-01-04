export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}

interface BaseEntry {
  id: string,
  date: string,
  type: string,
  specialist: string,
  diagnosisCodes?: string[],
  description: string
}

interface Discharge {
  date: string,
  criteria: string
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: Discharge
}

interface SickLeave {
  startDate: string,
  endDate: string
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthCare",
  employerName: string,
  sickLeave?: SickLeave
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck",
  healthCheckRating: HealthCheckRating
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;