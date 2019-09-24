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

var addEvent = function addEvent(object, type, callback) {
  if (object == null || typeof object === 'undefined') return;

  if (object.addEventListener) {
    object.addEventListener(type, callback, false);
  } else if (object.attachEvent) {
    object.attachEvent("on".concat(type), callback);
  } else {
    object["on".concat(type)] = callback;
  }
};
var removeEvent = function removeEvent(object, type, callback) {
  if (object == null || typeof object === 'undefined') return;

  if (object.removeEventListener) {
    object.removeEventListener(type, callback, false);
  } else if (object.detachEvent) {
    object.detachEvent("on".concat(type), callback);
  } else {
    object["on".concat(type)] = null;
  }
};
var elemOffset = function elemOffset(elem) {
  var box = {
    top: 0,
    left: 0
  };
  var doc = elem && elem.ownerDocument;

  if (!doc) {
    return box;
  }

  var docElem = elem.ownerDocument.documentElement;
  box = elem.getBoundingClientRect();
  var win = window;
  return {
    top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
    left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
  };
};
var findByValue = function findByValue(obj, val, key) {
  var result = [];

  for (var outerKey in obj) {
    if (obj[outerKey][key] * 1 === val * 1) {
      result.push(outerKey);
    }
  }

  return result;
};

exports.addEvent = addEvent;
exports.elemOffset = elemOffset;
exports.findByValue = findByValue;
exports.removeEvent = removeEvent;
