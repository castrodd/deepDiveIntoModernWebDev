import express from 'express';
const app = express();
import cors from 'cors';
import patientsService from './services/patientsService';
import diagnosisService from './services/diagnosisService';

app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/patients', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

app.get('/api/diagnoses', (_req, res) => {
  res.send(diagnosisService.getEntries());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});