interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <div>
      <ul>
        {props.courseParts.map((part, index) => (
          <li key={index}>
            {part.name} - Exercises: {part.exerciseCount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Content;