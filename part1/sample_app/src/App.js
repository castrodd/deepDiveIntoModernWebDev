const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  let p = props.parts;
  return (
    <>
      <Part name={p[0].name} exercises={p[0].exercises} />
      <Part name={p[1].name} exercises={p[1].exercises} />
      <Part name={p[2].name} exercises={p[2].exercises} />
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

const Total = (props) => {
  let p = props.parts;
  return (
    <p>Number of exercises: {p[0].exercises + p[1].exercises + p[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App