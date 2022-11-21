import express from 'express';
const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('This works.');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server now running on port ${PORT}`);
});