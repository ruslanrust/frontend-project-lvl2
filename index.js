import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const readFile = (filepath) => {
  const fullpath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(fullpath, 'utf-8');
};

const genDiff = (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const object1 = JSON.parse(data1);
  const keys1 = Object.keys(object1);

  const data2 = readFile(filepath2);
  const object2 = JSON.parse(data2);
  const keys2 = Object.keys(object2);

  const keys = _.union(keys1, keys2).sort();
  const lines = keys.map((key) => {
    if(!Object.hasOwn(object1, key)) {
      return `  + ${key}: ${object2[key]}`;
    } else if (!Object.hasOwn(object2, key)) {
      return `  - ${key}: ${object1[key]}`;
    } else if (object1[key] !== object2[key]) {
      return `  - ${key}: ${object1[key]}\n  + ${key}: ${object2[key]}`;
    } else {
      return `    ${key}: ${object1[key]}`
    }
  });
  
  return ['{', ...lines, '}'].join('\n');
};

export default genDiff;