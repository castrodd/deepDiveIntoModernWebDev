import { CoursePart } from "../data/Course";

interface PartProps {
  key: string;
  course: CoursePart;
}

const Part = (props: PartProps) => {
  const course: CoursePart = props.course;
  switch (course.type) {
    case "normal":
      return <p key={course.name}> 
        <strong>{course.name} {course.exerciseCount}</strong><br />
        <i>{course.description}</i>
      </p>;
    case "groupProject":
      return <p key={course.name}> 
        <strong>{course.name} {course.exerciseCount}</strong><br />
        {course.groupProjectCount}
      </p>;
    case "submission":
      return <p key={course.name}> 
        <strong>{course.name} {course.exerciseCount}</strong><br />
        <i>{course.description}</i><br />
        {course.exerciseSubmissionLink}
      </p>;
    case "special":
      return <p key={course.name}> 
        <strong>{course.name} {course.exerciseCount}</strong><br />
        <i>{course.description}</i><br />
        required skills:{course.requirements.map(req => ` ${req} `)}
      </p>;
    default:
      return assertNever(course);
  }
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;