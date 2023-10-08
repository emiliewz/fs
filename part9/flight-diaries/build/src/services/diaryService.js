"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diaryentries_1 = __importDefault(require("../../data/diaryentries"));
const getEntries = () => {
    return diaryentries_1.default;
};
const getNonSensitiveEntries = () => {
    return diaryentries_1.default.map(({ id, date, weather, visibility }) => ({
        id, date, weather, visibility,
    }));
};
const addDiary = (entry) => {
    const newDiaryEntry = Object.assign({ id: Math.max(...diaryentries_1.default.map(d => d.id)) + 1 }, entry);
    diaryentries_1.default.push(newDiaryEntry);
    return newDiaryEntry;
};
const findById = (id) => {
    const entry = diaryentries_1.default.find(d => d.id === id);
    return entry;
};
exports.default = {
    getEntries,
    addDiary,
    getNonSensitiveEntries,
    findById
};
