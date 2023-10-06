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

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById
};