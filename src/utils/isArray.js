function isArray(source) {
  return Object.prototype.toString.call(source) === '[object Array]';
}

export default isArray;