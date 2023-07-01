function getDate() {
  const newDate = new Date();
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const year = newDate.getFullYear();
  const month = months[newDate.getMonth()];
  const date = newDate.getDate();
  let hour = newDate.getHours();
  let min = newDate.getMinutes();

  hour = padZero(hour);
  min = padZero(min);

  const time = `${date} ${month} ${year} ${hour}:${min}`;
  return time;
}

function padZero(value) {
  return (value < 10) ? `0${value}` : value;
}

module.exports = getDate;
