const forbidden1 = '1xbet';
const forbidden2 = 'xxx';

function checkSpam(str) {
  let initialStrToLowerCase = str.toLowerCase();
  if (!(initialStrToLowerCase.includes(forbidden1) || initialStrToLowerCase.includes(forbidden2))) {
    return false;
  } else {
    return true;
  }
}
