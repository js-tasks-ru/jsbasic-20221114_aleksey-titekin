function showSalary(users, age) {
  return users
  .filter(item => item.age <= age)
  .reduce((summary,item) => {
    if (summary.length > 0) summary += '\n';
    return summary += item.name + ', ' + item.balance;
  },'')
}
