const Course = ({ course }) => {
    const exercises = course.parts.map(part => part.exercises)
    const total = exercises.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    return (
      <div>
        <Header courseName = {course.name} /> 
        <Content parts = {course.parts} />
        <Total sum = {total} />
      </div>
    )
  }
  
  const Courses = ( {courses} ) => {
    return (
      <div>
        {courses.map ( course =>
          <Course key = {course.id} course = {course} />
        )}
      </div>
    )
  }
  
  const Header = ({ courseName }) => <h1>{courseName}</h1>
  
  const Total = ({ sum }) => <b>total of {sum} exercises</b>
  
  const Part = ({ part }) => 
    <p>
      {part.name} {part.exercises}
    </p>
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map ( part =>
          <Part key = {part.id} part = {part} />
        )}
      </div>
    )
  }

  export default Courses