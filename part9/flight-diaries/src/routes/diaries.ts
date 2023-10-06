import express from 'express';
import diaryService from '../services/diaryService';

const router = express.Router();

router.get(':/id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary); 
  } else {
    res.sendStatus(400);
  }
});

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diray!');
});

export default router;