import isObject from './isObject';

function indexOf(source, target, key) {
  if (isObject(target)) {
    let index = -1;
    for (let i = 0; i < source.length; i++) {
      const item = source[i];
      if (item[key] === target[key]) {
        index = i;
        break;
      }
    }
    return index;
  }
  return source.indexOf(target);
}

export default indexOf;