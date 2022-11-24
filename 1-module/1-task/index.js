function factorial(n) {
  if (n < 0) {
    return NaN;
  }
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result = result * i;
  }
  return result;
}
