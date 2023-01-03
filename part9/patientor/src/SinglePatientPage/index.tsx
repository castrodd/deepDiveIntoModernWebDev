import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
//import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Patient } from "../types";


const SinglePatientPage = () => {
  //const [{ patients }, dispatch] = useStateValue();
  const id = useParams().id;
  const [patient, setPatient] = React.useState<Patient>();
  //const [error, setError] = React.useState<string>();

  const fetchSinglePatient = async () => {
    try {
      if (id) {
        const { data: currentPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        console.log("THIS IS THE PATIENT", currentPatient);
        setPatient(currentPatient);
      } else {
        throw new Error("No id provided!");
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        //setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        //setError("Unknown error");
      }
    }
  };

  React.useEffect(() => {
    const getSinglePatient = async () => {
      await fetchSinglePatient();
    };
  
    void getSinglePatient();
  });

  return (
    <div className="App">
      <p>{patient?.name}</p>
      <p>{patient?.gender}</p>
      <p>{patient?.dateOfBirth}</p>
      <p>{patient?.occupation}</p>
    </div>
  );
};

export default SinglePatientPage;
