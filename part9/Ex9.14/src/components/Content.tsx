
import Part from "./Part";
import { CoursePart } from '../types'


const Content = ({ courseParts }: { courseParts: Array<CoursePart> }): JSX.Element => {
    return (
      <div>
        {courseParts.map(part => (
          <Part key={part.name} part={part} />
        ))}
      </div>
    )
  }
  
  export default Content;