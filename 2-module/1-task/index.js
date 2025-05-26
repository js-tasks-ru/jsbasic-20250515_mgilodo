let salaries = {
  John: 1000,
  Ann: 1600,
  Pete: 1300,
  month: 'December',
  currency: 'USD',
  isPayed: false
};

function sumSalary(salaries) {
  let total = 0;
  for (let key in salaries) {
    if (typeof salaries[key] === 'number' && isFinite(salaries[key]) && salaries[key] > 0) {
      total += salaries[key];
    }
  }
  return total;
}
