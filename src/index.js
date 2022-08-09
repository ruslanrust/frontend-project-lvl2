import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parse from './parsers.js';

const getData = (filepath) => {
  const fullpath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(fullpath, 'utf-8');
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const format1 = path.extname(filepath1);
  const object1 = parse(data1, format1);
  const keys1 = Object.keys(object1);

  const data2 = getData(filepath2);
  const format2 = path.extname(filepath2);
  const object2 = parse(data2, format2);
  const keys2 = Object.keys(object2);

  const keys = _.union(keys1, keys2).sort();
  const lines = keys.map((key) => {
    if (!Object.hasOwn(object1, key)) {
      return `  + ${key}: ${object2[key]}`;
    }
    if (!Object.hasOwn(object2, key)) {
      return `  - ${key}: ${object1[key]}`;
    }
    if (object1[key] !== object2[key]) {
      return `  - ${key}: ${object1[key]}\n  + ${key}: ${object2[key]}`;
    }

    return `    ${key}: ${object1[key]}`;
  });

  return ['{', ...lines, '}'].join('\n');
};

export default genDiff;
