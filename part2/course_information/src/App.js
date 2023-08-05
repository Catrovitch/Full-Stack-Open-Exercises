const Header = ({ course }) => {
  return (
  <h1>{course}</h1>
  )
}

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => {
  return (
  <>
    {part.name} {part.exercises}
  </>
  )
}

const Content = ({ parts }) => {
  return (
  <>
    {parts.map(part => (
      <li key={part.id}>
        <Part part={part}></Part>
      </li>
    ))}
  </>
  )
};

const Course = ({ course }) => {
  const parts = course.parts
  return (
    <>
      <Header course={ course.name }></Header>
      <Content parts={ parts }></Content>
      <Total sum={ parts.reduce((sum, parts) => sum + parts.exercises, 0) }></Total>
    </>
  )
}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Extra-part',
        exercises: 100,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App