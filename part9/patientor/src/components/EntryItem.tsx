import { Entry } from "../types";
import { EntryTypeIcon } from "./EntryTypeIcon";

interface EntryItemProps {
    entry: Entry;
    diagnosesMap: {[key:string]: string};
}

export const EntryItem = ({entry, diagnosesMap}: EntryItemProps) => {
    return (
        <div 
            className="entryItem"
            style={{padding: "10px", outlineStyle: "dashed", marginBottom: "10px"}} 
            key={entry.id}>
                <p>{entry.date} {<EntryTypeIcon type={entry.type} />}</p>
                <p>Specialist: {entry.specialist}</p>
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
