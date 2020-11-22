import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntires());
});

router.post('/', (req, res) => {
  const createdPatient = patientService.addEntry(req.body);
  res.json(createdPatient);
});

export default router;