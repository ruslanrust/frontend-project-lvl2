import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['file1.json', 'file2.json', 'stylish.txt'],
  ['file1.yml', 'file2.yml', 'stylish.txt'],
])('format stylish', (testFile1, testFile2, expectedFile) => {
  const filepath1 = getFixturePath(testFile1);
  const filepath2 = getFixturePath(testFile2);
  const actual = genDiff(filepath1, filepath2);
  const expected = readFile(expectedFile);
  expect(actual).toBe(expected);
});

test.each([
  ['file1.json', 'file2.json', 'plain.txt'],
  ['file1.yml', 'file2.yml', 'plain.txt'],
])('format plain', (testFile1, testFile2, expectedFile) => {
  const filepath1 = getFixturePath(testFile1);
  const filepath2 = getFixturePath(testFile2);
  const actual = genDiff(filepath1, filepath2, 'plain');
  const expected = readFile(expectedFile);
  expect(actual).toBe(expected);
});
