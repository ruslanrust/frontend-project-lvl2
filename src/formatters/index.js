import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
};

const format = (diff, formatName) => {
  if (!Object.hasOwn(formatters, formatName)) {
    throw new Error(`Unknown format: '${formatName}'.`);
  }
  return formatters[formatName](diff);
};

export default format;
