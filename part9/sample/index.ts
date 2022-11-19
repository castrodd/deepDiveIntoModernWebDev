import express from 'express';
import { multiplicator } from './multiplicator';
const app = express();

app.get('/ping', (_, res) => {
  res.send('pong');
});

app.get('/pong', (_, res) => {
  res.send('ping');
});

app.post('/calculate', (req, res) => {
  const { value1, value2, op } = req.body;

  const result = multiplicator(value1, value2, op);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});