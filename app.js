var express = require('express');
const app = express()
const port = 3000

const db = require('./static/BACK-END/connectiondb');

app.use(express.static('static'))

app.use(express.json());


app.get('/getEmployees', function(req, res){
  //TODO - create individual controllers/services to hold logic & sql queries
  var sql = "select * from hare.employee";
  db.selectSql(sql,function (data){
    res.json(data);
  });
});

app.post('/addEmployee', function (req, res) {
  var sql = `insert into hare.employee values ('${req.body.name}','${req.body.company}','.','.','.')`;
  db.selectSql(sql,function (data){
    res.json(data);
  });
});

app.post('/addUser', function (req, res) {
  console.log(req.body);
  var sql = `insert into hare.users values (null,'${req.body.username}','${req.body.email}','${req.body.password}')`;
  db.selectSql(sql,function (data){
    res.json(data);
  });
});


app.post('/authenticateUser', function(req, res){
  //TODO - create individual controllers/services to hold logic & sql queries
  var sql = `SElECT * from hare.users WHERE email='${req.body.email}' AND user_password='${req.body.password}'`;
  db.selectSql(sql,function (data){
    console.log("response: "+ data);
    res.json(data);
  });
});
// app.post('/authenticateUser', async (req,res)=>{
//   console.log(req.body);
//   var sql = `SElECT * from hare.users WHERE email='${req.body.email}' AND user_password='${req.body.password}'`;
//   const data = await db.sqlQuery(sql);
//   res.json(data);
//});




app.listen(port, () => console.log(`Listening on port ${port}!`))
