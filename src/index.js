import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parse from './parsers.js';
import format from './formatters/index.js';

const getData = (filepath) => {
  const fullpath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(fullpath, 'utf-8');
};

const getObject = (filepath) => {
  const data = getData(filepath);
  const extension = path.extname(filepath);
  const object = parse(data, extension);
  return object;
};

const buildTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2).sort();

  const result = keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, type: 'nested', children: buildTree(obj1[key], obj2[key]) };
    }

    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key, type: 'changed', valueBefore: obj1[key], valueAfter: obj2[key],
      };
    }

    return { key, type: 'unchanged', value: obj1[key] };
  });

  return result;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const object1 = getObject(filepath1);
  const object2 = getObject(filepath2);
  const diff = buildTree(object1, object2);

  return format(diff, formatName);
};

export default genDiff;
