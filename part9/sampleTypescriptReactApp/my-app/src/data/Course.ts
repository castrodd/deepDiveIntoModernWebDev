export const courseName = "Half Stack application development";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartExpanded extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartExpanded {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartExpanded {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartExpanded {
  type: "special";  
  requirements: string[];
}

export type CoursePart = CourseNormalPart 
  | CourseProjectPart 
  | CourseSubmissionPart
  | CourseSpecialPart;

export const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the easy course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the hard course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
]