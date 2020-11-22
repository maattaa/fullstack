import express from 'express';
import { bmiEndpoint } from './bmiCalculator';
import { exerciseEndpoint } from './exerciseCalculator';
//import {exerciseEndpoint} from './exerciseCalculator';

const app = express();
app.use(express.json());
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);
  const bmi = bmiEndpoint(height, weight);
  res.send(bmi);
});

interface ExerciseRequest {
  daily_exercises: Array<number>,
  target: number
}

app.post('/exercises', (req, res) => {
  const paramsMissing = (): void => {
    res.send({error: 'parameters missing'});
  };

  const paramsMalformatted = (): void => {
    res.send({error: 'malformatted parameters'});
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: ExerciseRequest = req.body;
  if (body.daily_exercises == undefined || body.target == undefined) {
    paramsMissing();
  } else if (
    isNaN(body.target) ||
    !Array.isArray(body.daily_exercises)) {
    paramsMalformatted();
  } 
  body.daily_exercises.forEach(e => {
    if (isNaN(e)) {
      paramsMalformatted();
    }
  });
  console.log(body.daily_exercises, 'daily');
  console.log(typeof(body.daily_exercises), 'typeof daily');
  console.log(body.target, 'target');
  console.log(typeof(body.target));
  const exerciseResult = exerciseEndpoint(body.daily_exercises, body.target);
  res.send(JSON.parse(exerciseResult));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});