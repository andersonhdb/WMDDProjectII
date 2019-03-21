var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'rds-mysql-hare.cpw3vvlmblxr.us-east-1.rds.amazonaws.com',
  port     : '3306',
  user     : 'masterUsername',
  password : 'masterHare',
  database : 'hare'
});

function selectSql(sql, callback){
  //TODO generic select logic, where, join, orderby, etc...
  executeSelectSql(sql, callback);
}

function executeSelectSql(sql, callback){
  connection.query(sql, function (err, result) {
    if (err){throw err;}
    var strData = JSON.stringify(result);
    var jsonData = JSON.parse(strData);
    callback(jsonData);
  });
}

function getShifts(sql, position_id, week, callback){

    connection.query(sql, function (err, result) {
      if (err){throw err;}
      var strData = JSON.stringify(result);
      var jsonData = JSON.parse(strData);
      if(jsonData[0] == undefined){
        callback(jsonData);
      }else{

      // for (employee in jsonData){
      //   console.log(jsonData[employee].id);
      //   if((jsonData.length - 1) == employee){
      //     console.log("MEU FINAL");
      //     console.log(jsonData);
      //     callback(jsonData);
      //   }
      // }

      for (employee in jsonData){
        eachPerson(jsonData, employee, position_id, callback, week);
      }
    }
  });//QUERY que pega os employees
}


function eachPerson(jsonData, employee, position_id, callback, week){

  var sql2 = `SELECT dw.monday_fk, dw.tuesday_fk, dw.wednesday_fk, dw.thursday_fk, dw.friday_fk, dw.saturday_fk, dw.sunday_fk
              FROM hare.days_week as dw
              join employee_position_calendar as epc
              on epc.days_week_fk = dw.id
              join employees_positions as ep
              on epc.employee_position_fk = ep.id
              where ep.position_fk = ${position_id} and ep.employee_fk = ${jsonData[employee].id}
              and epc.week_number = ${week.week_number} and epc.year_number = ${week.year_number};`;
  connection.query(sql2, function (err2, result2) {
    if (err2){throw err2;}
    var strData2 = JSON.stringify(result2);
    var jsonData2 = JSON.parse(strData2);

    var shifts = {};
    var count = 0;

    if(Object.keys(jsonData2).length == 0){
      jsonData2 = {};
      jsonData2[0] = {};

      jsonData2[0]['monday_fk'] = null;
      jsonData2[0]['tuesday_fk'] = null;
      jsonData2[0]['wednesday_fk'] = null;
      jsonData2[0]['thursday_fk'] = null;
      jsonData2[0]['friday_fk'] = null;
      jsonData2[0]['saturday_fk'] = null;
      jsonData2[0]['sunday_fk'] = null;

    }
    //MONDAY
     connection.query(`select * from shift where id = ${jsonData2[0]['monday_fk']}`, function (err00, result00) {
       if (err00){throw err00;}
       var strData00 = JSON.stringify(result00);
       var jsonData00 = JSON.parse(strData00);
       if(isEmpty(jsonData00[0])){
         shifts[0] = " ";
       }else{
         shifts[0] = jsonData00[0];
       }
     });
    //TUESDAY
     connection.query(`select * from shift where id = ${jsonData2[0]['tuesday_fk']}`, function (err01, result01) {
       if (err01){throw err01;}
       var strData01 = JSON.stringify(result01);
       var jsonData01 = JSON.parse(strData01);
       if(isEmpty(jsonData01[0])){
         shifts[1] = " ";
       }else{
         shifts[1] = jsonData01[0];
       }
     });
    //WEDNESDAY
     connection.query(`select * from shift where id = ${jsonData2[0]['wednesday_fk']}`, function (err02, result02) {
       if (err02){throw err02;}
       var strData02 = JSON.stringify(result02);
       var jsonData02 = JSON.parse(strData02);
       if(isEmpty(jsonData02[0])){
         shifts[2] = " ";
       }else{
         shifts[2] = jsonData02[0];
       }
     });
    //THURSDAY
     connection.query(`select * from shift where id = ${jsonData2[0]['thursday_fk']}`, function (err03, result03) {
       if (err03){throw err03;}
       var strData03 = JSON.stringify(result03);
       var jsonData03 = JSON.parse(strData03);
       if(isEmpty(jsonData03[0])){
         shifts[3] = " ";
       }else{
         shifts[3] = jsonData03[0];
       }
     });
    //FRIDAY
     connection.query(`select * from shift where id = ${jsonData2[0]['friday_fk']}`, function (err04, result04) {
       if (err04){throw err04;}
       var strData04 = JSON.stringify(result04);
       var jsonData04 = JSON.parse(strData04);
       if(isEmpty(jsonData04[0])){
         shifts[4] = " ";
       }else{
         shifts[4] = jsonData04[0];
       }
     });
    //SATURDAY
     connection.query(`select * from shift where id = ${jsonData2[0]['saturday_fk']}`, function (err05, result05) {
       if (err05){throw err05;}
       var strData05 = JSON.stringify(result05);
       var jsonData05 = JSON.parse(strData05);
       if(isEmpty(jsonData05[0])){
         shifts[5] = " ";
       }else{
         shifts[5] = jsonData05[0];
       }
     });
    //SUNDAY
     connection.query(`select * from shift where id = ${jsonData2[0]['sunday_fk']}`, function (err06, result06) {
       if (err06){throw err06;}
       var strData06 = JSON.stringify(result06);
       var jsonData06 = JSON.parse(strData06);
       if(isEmpty(jsonData06[0])){
         shifts[6] = " ";
       }else{
         shifts[6] = jsonData06[0];
       }

       jsonData[employee].shifts = shifts;
       // callback(jsonData);
       // console.log((jsonData.length - 1) +" === "+ employee);
       if((jsonData.length - 1) == employee){
         // console.log("MEU FINAL");
         // console.log(jsonData);
         callback(jsonData);
       }
     });
    // } end else
  });
}


function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

// To export a new function, pass it inside the array above
module.exports = {
  selectSql: selectSql,
  getShifts: getShifts,
  func2: function () {
    // func2 impl
  }
};
