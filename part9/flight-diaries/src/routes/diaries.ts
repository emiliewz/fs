import express from 'express';
import diaryService from '../services/diaryService';

const router = express.Router();

router.get('/:id', (req, res) => {
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

router.post('/', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { date, weather, visibility, comment } = req.body;
  const addedEntry = diaryService.addDiary({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    date, weather, visibility, comment
  });
  res.json(addedEntry);
});

export default router;