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
    top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
    left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
  };
};