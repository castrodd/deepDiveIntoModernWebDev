import { Entry } from "../types";

interface EntriesTableProps {
    entries: Entry[];
}

const EntriesTable = ({ entries }: EntriesTableProps) => {
    if (entries.length) {
        return (
            <div>
                <h2>Entries</h2>
                { entries.map(entry => {
                    return (
                        <div key={entry.id}>
                            <p>{entry.date}</p>
                            <p>{entry.description}</p>
                            <ul>
                            {entry?.diagnosisCodes && entry?.diagnosisCodes.map(code => {
                                <li>{code}</li>;
                            })
                            }
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
