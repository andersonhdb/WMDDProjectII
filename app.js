var express = require('express');
const app = express()
const port = 3000

const db = require('./static/BACK-END/connectiondb');

app.use(express.static('static'))

app.use(express.json());



// =============================================================================SELECTS

app.get('/getEmployees', function(req, res){
  var sql = "select * from hare.employee;";
  db.selectSql(sql,function (data){
    res.json(data);
  });
});

app.get('/getUsers', function(req, res){
  var sql = "select * from hare.users;";
  db.selectSql(sql,function (data){
    res.json(data);
  });
});

app.get('/getAllPositions', function(req, res){
  var sql = "select * from hare.positions;";
  db.selectSql(sql,function (data){
    res.json(data);
  });
});

app.get('/getAllWorkspaces', function(req, res){
  var sql = "select * from hare.workspaces;";
  db.selectSql(sql,function (data){
    res.json(data);
  });
});

app.post('/authenticateUser', function(req, res){
  var sql = `SElECT * from hare.users WHERE email='${req.body.email}' AND user_password='${req.body.password}';`;
  db.selectSql(sql,function (data){
    res.json(data);
  });
});

app.get('/getAllEmployees', function(req, res){
  var sql = "select * from hare.employee;";
  db.selectSql(sql,function (data){
    res.json(data);
  });
});

app.post('/postEmployeesPosition', function(req, res){
  var sql = `SELECT e.id, e.first_name, e.last_name, e.email, e.password
                     FROM hare.employee as e
                     JOIN hare.employees_positions as ep
                     ON ep.employee_fk = e.id
                     where ep.position_fk = ${req.body.position.id};`;
  db.selectSql(sql,function (data){
    data.push({index: req.body.index});
    res.json(data);
  });
});

// =============================================================================INSERTS

app.post('/addEmployee', function (req, res) {
  var sql = `insert into hare.employee values (null,'${req.body.firstname}','${req.body.lastname}','${req.body.email}','${req.body.password}');`;
  db.selectSql(sql,function (data){
    res.json(data);
  });
});

app.post('/addUser', function (req, res) {
  var sql = `insert into hare.users values (null,'${req.body.username}','${req.body.email}','${req.body.password}');`;
  db.selectSql(sql,function (data){
    res.json(data);
  });
});

app.post('/addPosition', function (req, res) {
  var sql = `insert into hare.positions values (null,'${req.body.positionName}');`;
  db.selectSql(sql,function (data){
    res.json(data);
  });
});

app.post('/addWorkspace', function (req, res) {
  var sql = `insert into hare.workspaces values (null,'${req.body.workspaceName}');`;
  db.selectSql(sql,function (data){
    res.json(data);
  });
});

app.post('/addEmployeePosition', function (req, res) {
  var sql = `insert into hare.employees_positions values (null,${req.body.employee.id},${req.body.position.id});`;
  db.selectSql(sql,function (data){
    res.json(data);
  });
});










app.listen(port, () => console.log(`Listening on port ${port}!`))
