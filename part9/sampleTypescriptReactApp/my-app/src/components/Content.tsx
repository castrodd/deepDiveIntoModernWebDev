import Part from "./Part";
import { CoursePart } from "../data/Course";

interface ContentProps {
  content: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {
        props.content.map(element => <Part key={element.name} course={element} />
      )}
    </div>
)};

export default Content;