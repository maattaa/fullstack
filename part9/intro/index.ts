import express from 'express';
import {bmiEndpoint} from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  const height = Number(_req.query.height)
  const weight = Number(_req.query.weight)
  const bmi = bmiEndpoint(height, weight);
  res.send(bmi);
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});