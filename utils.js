export const addEvent = (object, type, callback) => {
  if (object == null || typeof object === 'undefined') return;
  if (object.addEventListener) {
    object.addEventListener(type, callback, false);
  } else if (object.attachEvent) {
    object.attachEvent(`on${type}`, callback);
  } else {
    object[`on${type}`] = callback;
  }
};

export const removeEvent = (object, type, callback) => {
  if (object == null || typeof object === 'undefined') return;
  if (object.removeEventListener) {
    object.removeEventListener(type, callback, false);
  } else if (object.detachEvent) {
    object.detachEvent(`on${type}`, callback);
  } else {
    object[`on${type}`] = null;
  }
};

export const elemOffset = elem => {
  let box = { top: 0, left: 0 };
  const doc = elem && elem.ownerDocument;

  if (!doc) {
    return box;
  }

  const docElem = elem.ownerDocument.documentElement;

  box = elem.getBoundingClientRect();
  const win = window;

  return {
    top:
      box.top +
      (win.pageYOffset || docElem.scrollTop) -
      (docElem.clientTop || 0),
    left:
      box.left +
      (win.pageXOffset || docElem.scrollLeft) -
      (docElem.clientLeft || 0)
  };
};

export const findByValue = (obj, val, key) => {
  const result = [];

  for (const outerKey in obj) {
    if (obj[outerKey][key] * 1 === val * 1) {
      result.push(outerKey);
    }
  }

  return result;
};

export const getParentNodes = (className, parent) => {
  const arr = [];
  let par = parent;

  while (document.body !== par && par.classList.contains(className)) {
    arr.push(parent);
    par = parent.parentElement;
  }

  return arr;
};

export const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts
      .pop()
      .split(';')
      .shift();
  }

  return undefined;
};
