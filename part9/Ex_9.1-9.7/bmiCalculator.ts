function calculateBmi(heightInCm: number, weightInKg: number): string {
  if (isNaN(heightInCm) || isNaN(weightInKg) || heightInCm === 0 || weightInKg === 0) {
    throw new Error("Invalid input: Height and weight must be valid numbers and not zero.");
  }

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

//const args = process.argv.slice(2);

//if (args.length !== 2) {
  //console.log("Usage: node script.js <heightInCm> <weightInKg>");
  //process.exit(1);
//}

//const heightInCm = parseFloat(args[0]);
//const weightInKg = parseFloat(args[1]);

//const bmiCategory = calculateBmi(heightInCm, weightInKg);
//console.log(`BMI Category: ${bmiCategory}`);


export default calculateBmi;