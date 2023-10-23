
interface Rapport {
    periodLength: number;
    trainingDays: number;
    average: number;
    target: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
  }
  
  function calculateExercises(exerciseDays: number[], target: number): Rapport {
    if (!Array.isArray(exerciseDays) || exerciseDays.length === 0) {
        throw new Error("Invalid or empty exercise data.");
    }

    if (isNaN(target) || target <= 0) {
        throw new Error("Invalid or non-positive target value.");
    }

    const periodLength = exerciseDays.length;
    const trainingDays = exerciseDays.filter(item => item !== 0).length;
    const average = periodLength > 0 ? exerciseDays.reduce((acc, curr) => acc + curr, 0) / periodLength : 0;

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
        success,
        rating,
        ratingDescription,
        target,
        average,
    };

    return report;
}
  
  const args = process.argv.slice(2);

  if (args.length < 2) {
      console.log("Usage: node script.js <exercise1> <exercise2> ... <exerciseN> <target>");
      process.exit(1);
  }
  

  const exerciseValues = args.slice(1, args.length).map(Number);
  const target = Number(args[0]);
  
  const result = calculateExercises(exerciseValues, target);
  console.log(result);