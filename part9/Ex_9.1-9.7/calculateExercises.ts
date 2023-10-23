
interface Rapport {
    periodLength: number;
    trainingDays: number;
    average: number;
    target: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
  }
  
  function calculateExercises(weeklyExercise: number[], target: number): Rapport {
    const periodLength = weeklyExercise.length;
    const trainingDays = weeklyExercise.filter(item => item !== 0).length
    const average = weeklyExercise.reduce((acc, curr) => acc + curr, 0) / periodLength
  
    let success: boolean;
    let rating: number;
    let ratingDescription: string;
  
    if (average > target) {
        success = true;
        rating = 3;
        ratingDescription = "Great job!";
    } else if (average === target) {
        success = true;
        rating = 2;
        ratingDescription = "You met your goals!";
    } else {
        success = false;
        rating = 1;
        ratingDescription = "You did not achieve your goals :(";
    }
  
    const report: Rapport = {
        periodLength,
        trainingDays,
        average,
        target,
        success,
        rating,
        ratingDescription
    };
  
    return report;
  }
  
const weeklyExerciseData = [1, 2, 3, 0, 0, 2, 1, 4];
const target = 3; 
const result = calculateExercises(weeklyExerciseData, target);
console.log(result);