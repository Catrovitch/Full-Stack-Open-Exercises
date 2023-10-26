import { CoursePart } from '../types';
import { assertNever } from '../utils';

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  switch (part.kind) {
    case 'basic':
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br/>
          <i>{part.description}</i>
        </p>
      )
    case 'group':
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br/>
          project exercises {part.groupProjectCount}
        </p>
      )
    case 'submission':
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br/>
          <i>{part.description}</i>
          <br/>
          submit to <i>{part.exerciseSubmissionLink}</i>
        </p>
      )
    case 'background':
        return (
            <p>
                <b>{part.name} {part.exerciseCount}</b>
                <br/>
                <i>{part.description}</i>
                <p>submit to {part.backgroundMaterial}</p>
            </p>
        )
    case 'special':
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br/>
          <i>{part.description}</i>
          <br/>
          <p>Required skills: {part.requirements.map(requirement => (
              <li key={part.name}>{requirement}</li>
            ))}</p>
        </p>
      )
    default:
      return assertNever(part);
  }
}

export default Part;