function getMinMax(str) {
  const numbers = str
    .split(' ')
    .map(el => Number(el))
    .filter(el => !isNaN(el));

  if (numbers.length === 0) {
    return { min: null, max: null };
  }

  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers)
  };
}
