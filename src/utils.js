function randomDate(rangeOfDays) {
  var today = new Date(Date.now());
  var date = new Date(
    today.getYear() + 1900,
    today.getMonth(),
    today.getDate() + Math.random() * rangeOfDays
  );
  return `${date.getYear() + 1900}-${date.getMonth() + 1 < 10
    ? "0" + (date.getMonth() + 1)
    : date.getMonth() + 1}-${date.getDate() < 10
    ? "0" + date.getDate()
    : date.getDate()}`;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export { randomDate, getRandomIntInclusive };
