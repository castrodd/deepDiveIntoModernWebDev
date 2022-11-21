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
   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { value1, value2, op } = req.body;

  if ( !value1 || isNaN(Number(value1))) {
    return res.status(400).send({ error: 'Value is not a number.'});
  }

  if ( !value2 || isNaN(Number(value2))) {
    return res.status(400).send({ error: 'Value is not a number.'});
  }

  if ( !op ) {
    return res.status(400).send({ error: 'No operation argument.'});
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = multiplicator(Number(value1), Number(value2), op);
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});