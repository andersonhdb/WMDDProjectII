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
})

app.listen(port, () => console.log(`Listening on port ${port}!`))
