function factorial(n) {
  if (n === 0 || n === 1) {
    return 1
  };
  counter = 1;
  let result = n;
  while ((n - counter) >= 1) {
    result = result * (n - counter);
    counter++;
  }
  return result;
}
