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
    if (err) throw err;
    var strData = JSON.stringify(result);
    var jsonData = JSON.parse(strData);
    callback(jsonData);
  });
}

// To export a new function, pass it inside the array above
module.exports = {
  selectSql: selectSql,
  func2: function () {
    // func2 impl
  }
};
