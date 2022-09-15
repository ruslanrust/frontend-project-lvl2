import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import format from './formatters/index.js';
import buildTree from './buildtree.js';

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

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const object1 = getObject(filepath1);
  const object2 = getObject(filepath2);
  const diff = buildTree(object1, object2);

  return format(diff, formatName);
};

export default genDiff;
