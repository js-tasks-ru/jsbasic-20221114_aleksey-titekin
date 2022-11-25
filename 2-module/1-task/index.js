function sumSalary(salaries) {
  // ваш код...
  let sumResult = 0;

  for (let key in salaries) {
    if (
      typeof salaries[key] === "number" &&
      Boolean(salaries[key]) &&
      !(salaries[key] === Infinity || salaries[key] === -Infinity)
    ) {
      sumResult += salaries[key];
    }
  }
  return sumResult;
}
