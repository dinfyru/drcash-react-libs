'use strict';



function ___$insertStyle(css) {
  if (!css) {
    return;
  }
  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');

  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

Object.defineProperty(exports, '__esModule', { value: true });

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

var isBuffer = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
};

var defaultDelimiter = '[]';
var flatten = function flatten(target) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var delimiter = opts.delimiter || defaultDelimiter;
  var maxDepth = opts.maxDepth;
  var output = {};

  function step(object, prev) {
    var currentDepth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    Object.keys(object).forEach(function (key) {
      var value = object[key];
      var isArray = opts.safe && Array.isArray(value);
      var type = Object.prototype.toString.call(value);
      var isBuffer$1 = isBuffer(value);
      var isObject = type === '[object Object]' || type === '[object Array]';
      var newKey = prev ? prev + delimit(delimiter, key) : key;

      if (!isArray && !isBuffer$1 && isObject && Object.keys(value).length && (!opts.maxDepth || currentDepth < maxDepth)) {
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
    var delimiters = delimiter.split('');
    return delimiters[0] + key + delimiters[1];
  }
} // split a key by a delimiter(s)
// 1 or 2 characters
// 2 characters treated as brackets


function splitKey(key, delimiter) {
  if (delimiter.length === 2) {
    var delimiters = delimiter.split('');
    var regex = new RegExp("\\".concat(delimiters[1]), 'g');
    var result = key.replace(regex, '');
    return result.split(delimiters[0]);
  }

  return key.split(delimiter);
}

var unflatten = function unflatten(target) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var delimiter = opts.delimiter || defaultDelimiter;
  var overwrite = opts.overwrite || false;
  var result = {};
  var isBuffer$1 = isBuffer(target);

  if (isBuffer$1 || Object.prototype.toString.call(target) !== '[object Object]') {
    return target;
  }

  function getKey(key) {
    var parsedKey = Number(key);
    return isNaN(parsedKey) || key.indexOf('.') !== -1 || opts.object ? key : parsedKey;
  }

  var sortedKeys = Object.keys(target).sort(function (keyA, keyB) {
    return keyA.length - keyB.length;
  });
  sortedKeys.forEach(function (key) {
    var split = splitKey(key, delimiter);
    var key1 = getKey(split.shift());
    var key2 = getKey(split[0]);
    var recipient = result;

    while (key2 !== undefined) {
      var type = Object.prototype.toString.call(recipient[key1]);
      var isObject = type === '[object Object]' || type === '[object Array]'; // do not write over falsey, non-undefined values if overwrite is false

      if (!overwrite && !isObject && typeof recipient[key1] !== 'undefined') {
        return;
      }

      if (overwrite && !isObject || !overwrite && recipient[key1] == null) {
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

exports.flatten = flatten;
exports.unflatten = unflatten;
