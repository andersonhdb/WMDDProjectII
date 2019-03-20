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

// app.post('/postEmployeesPosition', function(req, res){
//   var sql = `SELECT e.id, e.first_name, e.last_name, e.email, e.password
//              FROM hare.employee as e
//              JOIN hare.employees_positions as ep
//              ON ep.employee_fk = e.id
//              JOIN hare.workspaces_positions as wp
//              ON wp.position_fk = ep.position_fk
//              where wp.position_fk =  ${req.body.position.id} and wp.workspace_fk = ${req.body.workspace.id}; `;
//   db.selectSql(sql,function (data){
//     data.push({index: req.body.index});
//     res.json(data);
//   });
// });

app.post('/postEmployeesPosition', function(req, res){
  var sql = `SELECT e.id, e.first_name, e.last_name, e.email, e.password
             FROM hare.employee as e
             JOIN hare.employees_positions as ep
             ON ep.employee_fk = e.id
             JOIN hare.workspaces_positions as wp
             ON wp.position_fk = ep.position_fk
             where wp.position_fk =  ${req.body.position.id} and wp.workspace_fk = ${req.body.workspace.id}; `;
  // db.selectSql(sql,function (data){
  //   data.push({index: req.body.index});
  //   res.json(data);
  // });
  // console.log(sql);
  db.getShifts(sql, req.body.position.id, function (data){
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
    res.json(createDaysWeek(data.insertId));
  });
});

function createDaysWeek(employees_positions_id){
  var sql = `insert into days_week values (null,null,null,null,null,null,null,null);`;
  db.selectSql(sql,function (data){
    return(createEmployeePositionShift(employees_positions_id, data.insertId));
  });
}

function createEmployeePositionShift(employees_positions_id, days_week_id){
  var sql = `insert into employee_position_days_week values (null, ${employees_positions_id}, ${days_week_id});`;
  db.selectSql(sql,function (data){
    return(data);
  });
}


// =============================================================================DELETES

app.delete('/removeEmployeePosition', function (req, res) {
  var sql = `select epdw.*
            from employee_position_days_week as epdw
            join employees_positions as ep
            on ep.id = epdw.employee_position_fk
            where ep.employee_fk = ${req.body.employee.id} and position_fk = ${req.body.position.id};`;
            // console.log(sql);
  db.selectSql(sql,function (data){
    // console.log(data[0].id);
    res.json(deleteEmployeePositionDaysWeek(data[0].id, req.body.employee.id, req.body.position.id));
  });
});

function deleteEmployeePositionDaysWeek(employee_position_days_week_id, employee_id, position_id){
  var sql = `delete from hare.employee_position_days_week where id = ${employee_position_days_week_id};`;
  db.selectSql(sql,function (data){
    return(deleteEmployeePosition(employee_id, position_id));
  });
}

function deleteEmployeePosition(employee_id, position_id){
  var sql = `delete from hare.employees_positions where employee_fk = ${employee_id} and position_fk = ${position_id};`;
  db.selectSql(sql,function (data){
    return(data);
  });
}


app.delete('/removeEmployee', function (req, res) {
  var sql = `delete from hare.employees_positions where employee_fk = ${req.body.id};`;
  db.selectSql(sql,function (data){
    // res.json(data);
  });
  var sql = `delete from hare.workspaces_employee where employee_fk = ${req.body.id};`;
  db.selectSql(sql,function (data){
    // res.json(data);
  });
  var sql = `delete from hare.employee where id = ${req.body.id};`;
  db.selectSql(sql,function (data){
    res.json(data);
  });
});


app.delete('/removePosition', function (req, res) {
  var sql = `delete from hare.employees_positions where position_fk = ${req.body.id};`;
  db.selectSql(sql,function (data){
    // res.json(data);
  });
  var sql = `delete from hare.workspaces_positions where position_fk = ${req.body.id};`;
  db.selectSql(sql,function (data){
    // res.json(data);
  });
  var sql = `delete from hare.positions where id = ${req.body.id};`;
  db.selectSql(sql,function (data){
    res.json(data);
  });
});


app.delete('/removeShift', function (req, res) {
  var sql = `delete from hare.workspaces_shift where shift_fk = ${req.body.id};`;
  db.selectSql(sql,function (data){
    // res.json(data);
  });
  var sql = `delete from hare.shift where id = ${req.body.id};`;
  db.selectSql(sql,function (data){
    res.json(data);
  });
});




//==================================================================================WORKSPACE selectSql

app.post('/getAllPositionsWorkspace', function(req, res){
  var sql = `SELECT p.id, p.position_name
            FROM hare.positions as p
            JOIN hare.workspaces_positions as wp
            ON wp.position_fk = p.id
            where wp.workspace_fk = ${req.body.id};`;
  db.selectSql(sql,function (data){
    res.json(data);
  });
});


app.post('/getAllEmployeesWorkspace', function(req, res){
  var sql = `SELECT e.id, e.first_name, e.last_name, e.email, e.password
          	FROM hare.employee as e
          	JOIN hare.workspaces_employee as we
          	ON we.employee_fk = e.id
            where we.workspace_fk = ${req.body.id};`;
  db.selectSql(sql,function (data){
    res.json(data);
  });
});

app.post('/getAllShiftsWorkspace', function(req, res){
  var sql = `SELECT s.id, s.shift_start, s.shift_end
            FROM hare.shift as s
            JOIN hare.workspaces_shift as ws
            ON ws.shift_fk = s.id
            where ws.workspace_fk = ${req.body.id};`;
  db.selectSql(sql,function (data){
    res.json(data);
  });
});


//==================================================================================WORKSPACE insertSql


app.post('/addPositionWorkspace', function (req, res) {
  var sql = `insert into hare.positions values (null,'${req.body.data.positionName}');`;
  db.selectSql(sql,function (data){
    return res.json(insertIntoWorkspacePositions(req.body.workspace.id, data.insertId));
  });
});

function insertIntoWorkspacePositions(workspaceId, positionId){
  var sql = `insert into hare.workspaces_positions values (null,${workspaceId},${positionId} );`;
  db.selectSql(sql,function (data){
    return (data);
  });
}


app.post('/addEmployeeWorkspace', function (req, res) {
  var sql = `insert into hare.employee values (null,'${req.body.employee.firstname}','${req.body.employee.lastname}','${req.body.employee.email}','${req.body.employee.password}');`;
  db.selectSql(sql,function (data){
    return res.json(insertIntoWorkspaceEmployee(req.body.workspace.id, data.insertId));
  });
});

function insertIntoWorkspaceEmployee(workspaceId, employeeId){
  var sql = `insert into hare.workspaces_employee values (null,${workspaceId},${employeeId} );`;
  db.selectSql(sql,function (data){
    return (data);
  });
}


app.post('/addShiftWorkspace', function (req, res) {
  var sql = `insert into hare.shift values (null,'${req.body.data.shift_start}:00','${req.body.data.shift_end}:00');`;
  db.selectSql(sql,function (data){
    return res.json(insertIntoWorkspaceShift(req.body.workspace.id, data.insertId));
  });
});

function insertIntoWorkspaceShift(workspaceId, shiftId){
  var sql = `insert into hare.workspaces_shift values (null,${workspaceId},${shiftId} );`;
  db.selectSql(sql,function (data){
    return (data);
  });
}

app.post('/addShiftEmployeePosition', function (req, res) {
  var sql = `SELECT d.id
              FROM hare.days_week as d
              JOIN hare.employee_position_days_week as epd
              ON epd.days_week_fk = d.id
              JOIN hare.employees_positions as ep
              ON ep.id = epd.employee_position_fk
              where ep.position_fk = ${req.body.position.id} and ep.employee_fk = ${req.body.employee.id} ;`;
  var new_shift = req.body.new_shift;
  var key = req.body.key;
  db.selectSql(sql,function (data){
    return res.json(insertUpdateShift(data, new_shift, key));
  });
});

function insertUpdateShift(data, new_shift, key){
  let day = getDayFromId(key);
  var sql = `update days_week set ${day} = ${new_shift} where id = ${data[0].id};`;
  db.selectSql(sql,function (data){
    return (data);
  });
}

function getDayFromId(number){
  var value = "CLOVIS";
  if(number == 0){
    value = "monday_fk";
  }
  if(number == 1){
    value = "tuesday_fk";
  }
  if(number == 2){
    value = "wednesday_fk";
  }
  if(number == 3){
    value = "thursday_fk";
  }
  if(number == 4){
    value = "friday_fk";
  }
  if(number == 5){
    value = "saturday_fk";
  }
  if(number == 6){
    value = "sunday_fk";
  }
  return value;
}










app.listen(port, () => console.log(`Listening on port ${port}!`))
