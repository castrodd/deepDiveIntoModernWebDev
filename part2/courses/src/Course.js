const Course = ({course}) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }
  
  const Header = ({course}) => {
    return (
      <h1>{course}</h1>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <>
        {parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.name}: {props.exercises}
      </p>
    )
  }
  
  const Total = ({parts}) => {
    return (
      <p>Number of exercises: {parts.reduce((prev, curr) => 
        prev + curr.exercises, 0)}
      </p>
    )
  }

  export default Course