import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";
import { Entry } from "../types";

interface EntriesTableProps {
    entries: Entry[];
}

const EntriesTable = ({ entries }: EntriesTableProps) => {
    const [diagnoses, setDiagnoses] = React.useState<Diagnosis[]>();
    const [error, setError] = React.useState<string>();
    const diagnosesMap: {[key:string]: string} = {};

    const fetchAllDiagnoses = async () => {
        try {
            const { data: allDiagnoses } = await axios.get<Diagnosis[]>(
                `${apiBaseUrl}/diagnoses`
            );

            setDiagnoses(allDiagnoses);
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
        const getDiagnoses = async () => {
            await fetchAllDiagnoses();
        };

        void getDiagnoses();
    });

    if (error) {
        return (
            <div>
                <p>{error}</p>
            </div>
        );
    }

    if (entries.length) {

        diagnoses?.forEach(diagnosis => {
            if (diagnosis) {
                diagnosesMap[diagnosis.code] = diagnosis.name;
            }
        }); 

        return (
            <div>
                <h2>Entries</h2>
                {entries.map(entry => {
                    return (
                        <div key={entry.id}>
                            <p>{entry.date}</p>
                            <p>{entry.description}</p>
                            <ul>
                                {entry?.diagnosisCodes && entry?.diagnosisCodes.map(code => {
                                    return (
                                        <li key={code}>
                                            {code}: {diagnosesMap[code]}
                                        </li>

                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>
        );
    }

    return <></>;
};

export default EntriesTable;
