import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/hello', (req, res) => {
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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});