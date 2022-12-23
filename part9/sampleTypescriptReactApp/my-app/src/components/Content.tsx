import { ContentProps } from "./ContentProps";

const Content = (props: ContentProps) => {
  return (
    <div>
      {
        props.content.map(ele => <p key={ele.name}> {ele.name} {ele.exerciseCount}</p>
      )}
    </div>
)};

export default Content;