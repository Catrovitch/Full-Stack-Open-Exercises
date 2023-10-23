// bmiCalculator.ts

function calculateBmi(heightInCm: number, weightInKg: number): string {
  const heightInM = heightInCm / 100;
  const bmi = weightInKg / (heightInM * heightInM);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return "Normal (healthy weight)";
  } else if (bmi >= 25 && bmi < 29.9) {
    return "Overweight";
  } else {
    return "Obese";
  }
}

const height = 180;
const weight = 74;

const bmiResult = calculateBmi(height, weight);
console.log(bmiResult);
