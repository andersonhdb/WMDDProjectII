var path       = require("path");
var express    = require("express");
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'rds-mysql-hare.cpw3vvlmblxr.us-east-1.rds.amazonaws.com',
  port     : '3306',
  user     : 'masterUsername',
  password : 'masterHare',
  database : 'hare'

});

var htmlPath = path.join(__dirname, "pages");
var app = express();

/*connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "insert into hare.employee values ('Test','Test INC','Test','M','12-12-1993')";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});*/

app.use(express.static(htmlPath));

app.get('/login', (req,res)=>{
  res.sendFile(__dirname + '/pages/login/login.html');
})

app.post('/user/authenticateUser', (req,res)=>{
  console.log("POST RECEIVED");
  res.send("POST request sucessful");
  console.log("RESPONSE SENT");
});

var port = process.env.port || 80
var server = app.listen(port);
console.log('Express app started on port ' + port);
