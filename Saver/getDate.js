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
    
  // Places 0 in front of hours less than 10 (i.e., 06:00 instead of 6:00).
  hour = (hour < 10) ? `0${hour}` : hour;
  
  let min = newDate.getMinutes();

  // Places 0 in front of minutes less than 10 (i.e., 06:00 instead of 06:0).
  min = (min < 10) ? `0${min}` : min;

  const time = `${date} ${month} ${year} ${hour}:${min}`;
  return time;
}

module.exports = getDate;
  