"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const toNewDiaryEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object) {
        const newEntry = {
            date: parseDate(object.date),
            weather: parseWeather(object.weather),
            visibility: parseVisibility(object.visibility),
            comment: parseComment(object.comment),
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing');
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseComment = (comment) => {
    // check !comment removed:
    if (!isString(comment)) {
        throw new Error('Incorrect or missing comment');
    }
    return comment;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    // check !date removed:
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const isWeather = (param) => {
    // return ['sunny', 'rainy', 'cloudy', 'stormy'].includes(str);
    return Object.values(types_1.Weather).map(v => v.toString()).includes(param);
};
const parseWeather = (weather) => {
    // check !weather removed:
    if (!isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather: ' + weather);
    }
    return weather;
};
const isVisibility = (param) => {
    return Object.values(types_1.Visibility).map(v => v.toString()).includes(param);
};
const parseVisibility = (visibility) => {
    // check !visibility removed:
    if (!isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect or missing visibility: ' + visibility);
    }
    return visibility;
};
exports.default = toNewDiaryEntry;
