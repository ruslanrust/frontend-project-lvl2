import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import format from './formatters/index.js';
import buildTree from './buildtree.js';

const readFile = (filepath) => {
  const fullpath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(fullpath, 'utf-8');
};

const getData = (filepath) => {
  const data = readFile(filepath);
  const extension = path.extname(filepath).slice(1);
  return parse(data, extension);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const object1 = getData(filepath1);
  const object2 = getData(filepath2);
  const diff = buildTree(object1, object2);

  return format(diff, formatName);
};

export default genDiff;
