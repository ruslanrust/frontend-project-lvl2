import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('nested json data', () => {
  const expected = readFile('nested.txt');
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const actual = genDiff(filepath1, filepath2);

  expect(actual).toEqual(expected);
});

test('nested yaml data', () => {
  const expected = readFile('nested.txt');
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  const actual = genDiff(filepath1, filepath2);

  expect(actual).toEqual(expected);
});
