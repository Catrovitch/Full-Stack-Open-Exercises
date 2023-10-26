interface TotalProps {
    totalExercises: number;
  }
  
  const Total: React.FC<TotalProps> = ({ totalExercises }) => {
    return (
      <p>
        <strong>Total Exercises:</strong> {totalExercises}
      </p>
    );
  };
  
  export default Total;