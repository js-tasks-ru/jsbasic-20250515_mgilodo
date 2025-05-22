function ucFirst(str) {
  let initialStrLowerCase = str.toLowerCase();
  let firstCharUpperCase = str.length > 0 ? str.at(0).toUpperCase() : '';
  let result = firstCharUpperCase + initialStrLowerCase.slice(1);
  return result;
}
