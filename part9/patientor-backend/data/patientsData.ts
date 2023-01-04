import { Patient, PatientEntry } from "../types";
import patients from "./patients";
import toNewPatientEntry from "../utils";

const data: Array<Patient> = patients;

const patientEntries: PatientEntry[] = data.map(obj => {
  const object = toNewPatientEntry(obj) as PatientEntry;
  object.id = obj.id;
  return object;
});

export default patientEntries;