const Header = ({ course }) => {
  return (
  <h1>{course}</h1>
  )
}

const Total = ({ sum }) => <b>Number of exercises {sum}</b>

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
      <p key={part.id}>
        <Part part={part}></Part>
      </p>
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

const Courses = ({ courses }) => {
  const courseItems = [];

  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    courseItems.push(
      <div key={course.id}>
        <Course course={course}></Course>
      </div>
    );
  }

  return <>{courseItems}</>;
};


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Courses courses={courses} />
}

export default App