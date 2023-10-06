import diaries from '../../data/diaryentries';
import { NonSensitiveEntry, DiaryEntry } from '../../types';

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveEntry[] => {
  return diaries.map(({id, date, weather, visibility}) => ({
    id, date, weather, visibility,
  }));
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries
};