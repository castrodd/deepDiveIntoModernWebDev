import express from 'express';
const app = express();

app.get('/ping', (_, res) => {
  res.send('pong');
});

app.get('/pong', (_, res) => {
  res.send('ping');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});