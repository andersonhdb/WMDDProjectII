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

function getShifts(sql, position_id, callback){
  // console.log("clovis");

  connection.query(sql, function (err, result) {
    if (err){throw err;}
    var strData = JSON.stringify(result);
    var jsonData = JSON.parse(strData);

    // console.log(jsonData);
    if(jsonData[0] == undefined){
      callback(jsonData);
    }else{


    var sql2 = `SELECT d.monday_fk, d.tuesday_fk, d.wednesday_fk, d.thursday_fk, d.friday_fk, d.saturday_fk, d.sunday_fk
                FROM hare.days_week as d
                JOIN hare.employee_position_days_week as epd
                ON epd.days_week_fk = d.id
                JOIN hare.employees_positions as ep
                ON ep.id = epd.employee_position_fk
                where ep.position_fk = ${position_id} and ep.employee_fk = ${jsonData[0].id} ;`;
    connection.query(sql2, function (err2, result2) {
      if (err2){throw err2;}
      var strData2 = JSON.stringify(result2);
      var jsonData2 = JSON.parse(strData2);

      // jsonData[0].week_days = jsonData2[0];
      console.log(jsonData2);

      // =======================================================================CLOVIS - getting shift from days - 0

      var shifts = {};
      var count = 0;


      // =======================================================================right way - 0
      // for (var k in jsonData2[0]){
      //     if (jsonData2[0].hasOwnProperty(k)) {
      //          // console.log("Key is " + k + ", value is" + jsonData2[0][k]);
      //
      //          var sql0 = `select * from shift where id = ${jsonData2[0][k]}`;
      //          console.log(sql0);
      //
      //          connection.query(sql0, function (err0, result0) {
      //            if (err0){throw err0;}
      //            var strData0 = JSON.stringify(result0);
      //            var jsonData0 = JSON.parse(strData0);
      //            console.log(jsonData0);
      //            shifts[count] = jsonData0[0];
      //            count++;
      //          });
      //     }
      // }
      // =======================================================================right way - x




      //MONDAY
       connection.query(`select * from shift where id = ${jsonData2[0]['monday_fk']}`, function (err00, result00) {
         if (err00){throw err00;}
         var strData00 = JSON.stringify(result00);
         var jsonData00 = JSON.parse(strData00);
         // console.log(jsonData00);
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
         // console.log(jsonData01);
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
         // console.log(jsonData02);
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
         // console.log(jsonData03);
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
         // console.log(jsonData04);
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
         // console.log(jsonData05);
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
         // console.log(jsonData06);
         if(isEmpty(jsonData06[0])){
           shifts[6] = " ";
         }else{
           shifts[6] = jsonData06[0];
         }


         jsonData[0].shifts = shifts;
         // console.log(jsonData[0]);
         // jsonData[0].week_days = jsonData2[0];
         // console.log(jsonData[0]);
         callback(jsonData);

       });





















      // =======================================================================CLOVIS - getting shift from days - X

      // jsonData[0].shifts = shifts;
      // console.log(jsonData[0]);
      // // jsonData[0].week_days = jsonData2[0];
      // // console.log(jsonData[0]);
      // callback(jsonData);
    });
  }

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
