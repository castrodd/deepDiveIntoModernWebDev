import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import EntriesTable from "../components/EntriesTable";
import Gender from "../components/Gender";
import { AddEntryForm, EntryFormValues } from "../components/AddPatientEntryForm";

const SinglePatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = React.useState<Patient>();
  const [error, setError] = React.useState<string>();

  const fetchSinglePatient = async () => {
    try {
      if (id) {
        const { data: currentPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        
        setPatient(currentPatient);
      } else {
        throw new Error("No id provided!");
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const postEntry = async (entry: EntryFormValues) => {
    try {
      if (id) {
        await axios
          .post(`${apiBaseUrl}/patients/${id}/entries`,
          {
            ...entry
          });
      } else {
        throw new Error("No id provided!");
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  React.useEffect(() => {
    const getSinglePatient = async () => {
      await fetchSinglePatient();
    };
  
    void getSinglePatient();
  }, []);

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="App">
      <p>{patient?.name}</p>
      <Gender gender={patient?.gender} />
      <p>{patient?.dateOfBirth}</p>
      <p>{patient?.occupation}</p>
      {patient?.entries && <EntriesTable entries={patient?.entries} />}
      <h3>Add Entry</h3>
      <AddEntryForm 
        onSubmit={postEntry}
        onCancel={() => false}
      />
    </div>
  );
};

export default SinglePatientPage;
