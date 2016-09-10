function isObject(source) {
  return Object.prototype.toString.call(source) === '[object Object]';
}

export default isObject;