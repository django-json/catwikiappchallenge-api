/**
 * @description A function to check if an oject is empty
 * @param {Object} obj The object to be tested
 * @returns true if empty; false otherwise
 */

function isObjectEmpty(obj) {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
}

module.exports = {
  isObjectEmpty,
};
