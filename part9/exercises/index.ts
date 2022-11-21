import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, ExerciseSummary } from './exerciseCalculator';
import bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json();

app.get('/hello', (_, res) => {
  res.send('Hello, Full Stack!');
});

app.get('/bmi', (req, res) => {
  const {height, weight} = req.query;
  const errorResponse = {
    error: "malformatted parameters"
  };

  if (height == null || weight == null) {
    res.send(errorResponse);
    return;
  }

  const heightValue = Number(height);
  const weightValue = Number(weight);

  if (isNaN(heightValue) || isNaN(weightValue)) {
    res.send(errorResponse);
    return;
  }

  const bmiResult = calculateBmi(Number(height), Number(weight));
  const response = {
    height: Number(height),
    weight: Number(weight),
    bmi: bmiResult
  };
  res.send(response);
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
app.post('/exercises', jsonParser, (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = req.body;

  console.log(daily_exercises, target);
  const errorResponse = {
    error: "malformatted parameters"
  };

  try {
    if (typeof target != 'number' || target == null) {
      res.send('Target should be a number.');
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    if (!daily_exercises.every((n: number) => !isNaN(n)) || daily_exercises == null) {
      res.send('dailyExercises should be an array of numbers.');
      return;
    }
  } catch {
    res.send(errorResponse);
    return;
  }

  const result: ExerciseSummary = calculateExercises(daily_exercises as number[], target);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});