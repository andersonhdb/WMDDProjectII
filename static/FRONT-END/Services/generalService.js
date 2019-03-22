
// Returns the ISO week of the date.
Date.prototype.getWeek = function() {
  var date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  var week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                        - 3 + (week1.getDay() + 6) % 7) / 7);
}

// Returns the four-digit year corresponding to the ISO week of the date.
Date.prototype.getWeekYear = function() {
  var date = new Date(this.getTime());
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  return date.getFullYear();
}


function getFirstDayOfTheWeek(date){
  var year = date.getWeekYear();
  var week = date.getWeek();
  var firstDay = new Date(year, 0, 1).getDay();
  var d = new Date("Jan 01, " + year + " 01:00:00");
  var w = d.getTime() - (3600000 * 24 * (firstDay - 1)) + 604800000 * (week - 1)
  var n1 = new Date(w);
  // console.log(formatDate(n1));
  return(n1);
}

function getFirstDayOfTheWeekByYearWeek(year, week){
  var firstDay = new Date(year, 0, 1).getDay();
  var d = new Date("Jan 01, " + year + " 01:00:00");
  var w = d.getTime() - (3600000 * 24 * (firstDay - 1)) + 604800000 * (week - 1)
  var n1 = new Date(w);
  // console.log(formatDate(n1));
  return(n1);
}

function getLastDayOfTheWeek(date){
  var year = date.getWeekYear();
  var week = date.getWeek();
  var firstDay = new Date(year, 0, 1).getDay();
  var d = new Date("Jan 01, " + year + " 01:00:00");
  var w = d.getTime() - (3600000 * 24 * (firstDay - 1)) + 604800000 * (week - 1)
  var n2 = new Date(w + 518400000)
  // console.log(formatDate(n2));
  return(n2);
}

function getLastDayOfTheWeekByYearWeek(year, week){
  var firstDay = new Date(year, 0, 1).getDay();
  var d = new Date("Jan 01, " + year + " 01:00:00");
  var w = d.getTime() - (3600000 * 24 * (firstDay - 1)) + 604800000 * (week - 1)
  var n2 = new Date(w + 518400000)
  // console.log(formatDate(n2));
  return(n2);
}

function getCurrentWeekNumber(){
  var data = new Date();
  return data.getWeek();
}

function formatDate(date){
  var dd = date.getDate();
  var mm = date.getMonth() + 1; //January is 0!

  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  var date = dd + '/' + mm + '/' + yyyy;
  return date;
}

// getFirstDayOfTheWeek(new Date());
// getLastDayOfTheWeek(new Date());
