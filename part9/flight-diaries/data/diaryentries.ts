import { DiaryEntry } from '../src/types';
import toNewDiaryEntry from '../src/utils';

const data = [
  {
    "id": 1,
    "date": "2023-01-01",
    "weather": "rainy",
    "visibility": "poor",
    "comment": "Pretty scary flight, I'm glad I'm alive"
  },
  {
    "id": 2,
    "date": "2023-04-01",
    "weather": "sunny",
    "visibility": "good",
    "comment": "Everything went better than expected, I'm learning much"
  },
  {
    "id": 3,
    "date": "2023-04-15",
    "weather": "windy",
    "visibility": "good",
    "comment": "I'm getting pretty confident although I hit a flock of birds"
  },
  {
    "id": 4,
    "date": "2023-05-11",
    "weather": "cloudy",
    "visibility": "good",
    "comment": "I almost failed the landing but I survived"
  }
];

const diaryEntries: DiaryEntry [] = data.map(obj => {
  const object = toNewDiaryEntry(obj) as DiaryEntry;
  object.id = obj.id;
  return object;
});

export default diaryEntries;