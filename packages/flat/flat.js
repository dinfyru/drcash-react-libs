import isBuff from 'is-buffer';

const defaultDelimiter = '[]';

export const flatten = (target, opts = {}) => {
  const delimiter = opts.delimiter || defaultDelimiter;
  const { maxDepth } = opts;
  const output = {};

  function step(object, prev, currentDepth = 1) {
    Object.keys(object).forEach(key => {
      const value = object[key];
      const isArray = opts.safe && Array.isArray(value);
      const type = Object.prototype.toString.call(value);
      const isBuffer = isBuff(value);
      const isObject = type === '[object Object]' || type === '[object Array]';

      const newKey = prev ? prev + delimit(delimiter, key) : key;

      if (
        !isArray &&
        !isBuffer &&
        isObject &&
        Object.keys(value).length &&
        (!opts.maxDepth || currentDepth < maxDepth)
      ) {
        return step(value, newKey, currentDepth + 1);
      }

      output[newKey] = value;
    });
  }

  step(target);

  return output;
};

function delimit(delimiter, key) {
  if (delimiter.length === 1) {
    return delimiter + key;
  } else {
    const delimiters = delimiter.split('');
    return delimiters[0] + key + delimiters[1];
  }
}

// split a key by a delimiter(s)
// 1 or 2 characters
// 2 characters treated as brackets
function splitKey(key, delimiter) {
  if (delimiter.length === 2) {
    const delimiters = delimiter.split('');
    const regex = new RegExp(`\\${delimiters[1]}`, 'g');
    const result = key.replace(regex, '');
    return result.split(delimiters[0]);
  }
  return key.split(delimiter);
}

export const unflatten = (target, opts = {}) => {
  const delimiter = opts.delimiter || defaultDelimiter;
  const overwrite = opts.overwrite || false;
  const result = {};

  const isBuffer = isBuff(target);
  if (
    isBuffer ||
    Object.prototype.toString.call(target) !== '[object Object]'
  ) {
    return target;
  }

  function getKey(key) {
    const parsedKey = Number(key);

    return isNaN(parsedKey) || key.indexOf('.') !== -1 || opts.object
      ? key
      : parsedKey;
  }

  const sortedKeys = Object.keys(target).sort((keyA, keyB) => {
    return keyA.length - keyB.length;
  });

  sortedKeys.forEach(key => {
    const split = splitKey(key, delimiter);
    let key1 = getKey(split.shift());
    let key2 = getKey(split[0]);
    let recipient = result;

    while (key2 !== undefined) {
      const type = Object.prototype.toString.call(recipient[key1]);
      const isObject = type === '[object Object]' || type === '[object Array]';

      // do not write over falsey, non-undefined values if overwrite is false
      if (!overwrite && !isObject && typeof recipient[key1] !== 'undefined') {
        return;
      }

      if ((overwrite && !isObject) || (!overwrite && recipient[key1] == null)) {
        recipient[key1] = typeof key2 === 'number' && !opts.object ? [] : {};
      }

      recipient = recipient[key1];
      if (split.length > 0) {
        key1 = getKey(split.shift());
        key2 = getKey(split[0]);
      }
    }

    recipient[key1] = unflatten(target[key], opts);
  });

  return result;
};
