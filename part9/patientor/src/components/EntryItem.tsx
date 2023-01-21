import { Entry } from "../types";

interface EntryItemProps {
    entry: Entry;
    diagnosesMap: {[key:string]: string};
}

export const EntryItem = ({entry, diagnosesMap}: EntryItemProps) => {
    return (
        <div className="entryItem" key={entry.id}>
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
};
