import { ContentProps } from "./ContentProps";

const Total = (props: ContentProps) => {
  return (
    <p>
      Number of exercises{" "}
      {props.content.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
)}

export default Total;