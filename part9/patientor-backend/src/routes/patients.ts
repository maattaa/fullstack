import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntires());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

router.get('/:id', (req, res) => {
try {
  const id: string = req.params.id;
  const patient = patientService.getFullPatient(id);
  res.send(patient);
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  res.status(400).send(e.message);
}
});

export default router;