import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './calculateExercises';
import { Rapport } from './calculateExercises';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const heightInCm = parseFloat(req.query.height as string);
  const weightInKg = parseFloat(req.query.weight as string);

  if (!isNaN(heightInCm) && !isNaN(weightInKg)) {
    const bmi = {
      weight: weightInKg,
      height: heightInCm,
      bmi: calculateBmi(heightInCm, weightInKg)
    };
    res.send(bmi);
  } else {
    const error = {
      error: "malformatted parameters"
    };
    res.status(400).send(error);
  }
});

app.post('/exercises', (req, res) => {
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-assertion
  const { daily_exercises, target } = req.body as any;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const exercises = daily_exercises.map(Number);
  const targetValue = Number(target);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  if (exercises.some(isNaN) || isNaN(targetValue)) {
    console.log('here');
    return res.status(400).json({ error: "malformatted parameters" });
  }

  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result: Rapport = calculateExercises(exercises, targetValue);

  return res.json(result);
});



const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});