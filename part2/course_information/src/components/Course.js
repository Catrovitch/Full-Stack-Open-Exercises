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


export default Course