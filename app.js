var express = require('express');
const mailer = require ('nodemailer');
const app = express()
const port = 3000

const db = require('./static/BACK-END/connectiondb');

const transporter = mailer.createTransport({
  secure: false, // use SSL
  port: 25, // port for secure SMTP
  service: 'Outlook365',
  auth: {
    user: 'team.hare.cuckoo@outlook.com',
    pass: 'Clovisbornai00'
  },
  tls: {
        rejectUnauthorized: false
  }
});

//app.use(express.static('static'));

app.use('/',express.static('/static'));

app.use(express.json());

// app.get('/',(req, res)=>{
//   res.sendFile(__dirname + '/static/index.html');
// });

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

app.post('/authenticateEmployee', function(req, res){
  var sql = `SElECT * from hare.employee WHERE email='${req.body.email}' AND password='${req.body.password}';`;
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
             JOIN hare.workspaces_positions as wp
             ON wp.position_fk = ep.position_fk
             where wp.position_fk =  ${req.body.position.id} and wp.workspace_fk = ${req.body.workspace.id}; `;
  // db.selectSql(sql,function (data){
  //   data.push({index: req.body.index});
  //   res.json(data);
  // });
  // console.log(sql);
  db.getShifts(sql, req.body.position.id, req.body.week, function (data){
    data.push({index: req.body.index});
    res.json(data);
  });
});

app.post('/postSingleEmployeesPosition', function(req, res){
  var sql = `SELECT e.id, e.first_name, e.last_name, e.email, e.password
             FROM hare.employee as e
             JOIN hare.employees_positions as ep
             ON ep.employee_fk = e.id
             JOIN hare.workspaces_positions as wp
             ON wp.position_fk = ep.position_fk
             where wp.position_fk =  ${req.body.position.id} and wp.workspace_fk = ${req.body.workspace.id}
             and e.id = ${req.body.user.id}; `;
  // db.selectSql(sql,function (data){
  //   data.push({index: req.body.index});
  //   res.json(data);
  // });
  // console.log(sql);
  db.getShifts(sql, req.body.position.id, req.body.week, function (data){
    data.push({index: req.body.index});
    res.json(data);
  });
});


app.post('/getEmployeeRequest', (req, res) => {
  var sql = `SELECT e.id, e.content, e.status, e.day, e.time_start, e.time_end
             FROM hare.request as e
             WHERE e.employee_fk = ${req.body.employee_id};`;
  db.selectSql(sql,function (data){
    res.json(data);
  });
});

app.post('/getWorkspaceRequest', (req, res) => {
  var sql = `SELECT req.id, e.first_name, e.last_name, req.content, req.status, req.day, req.time_start, req.time_end
             FROM hare.request as req
             INNER JOIN hare.employee as e
             ON req.employee_fk = e.id
             WHERE req.workspace_fk = ${req.body.workspace_id};`;

  db.selectSql(sql,function (data){
    res.json(data);
  });
});

// =============================================================================INSERTS

app.post('/addEmployee', function (req, res) {
  console.log("adding employee");

  //------------SENDING EMAIL-----------------

  //-------------------- Adding to to the database-----------------------
  // var sql = `insert into hare.employee values (null,'${req.body.firstname}','${req.body.lastname}','${req.body.email}','${req.body.password}');`;
  // db.selectSql(sql,function (data){
  //   res.json(data);
  // });
});

app.post('/addUser', function (req, res) {
  var sql = `insert into hare.users values (null,'${req.body.username}','${req.body.email}','${req.body.password}', null);`;
  // console.log(sql);
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

app.post('/addEmployeePosition', function (req, res) {
  var sql = `insert into hare.employees_positions values (null,${req.body.employee.id},${req.body.position.id});`;
  db.selectSql(sql,function (data){
    res.json(data);
    // res.json(createDaysWeek(data.insertId));
  });
});

app.post('/addRequest', function (req, res) {
  var sql = `insert into hare.request values (null,"${req.body.data.content}","${req.body.data.status}",'${req.body.data.date}','${req.body.data.from}:00','${req.body.data.to}:00',${req.body.employee},${req.body.workspace});`;
  db.selectSql(sql,function (data){
    res.json(data);
    // res.json(createDaysWeek(data.insertId));
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
  var sql = `select epc.*
            from employee_position_calendar as epc
            join employees_positions as ep
            on ep.id = epc.employee_position_fk
            where ep.employee_fk = ${req.body.employee.id} and position_fk = ${req.body.position.id};`;
            // console.log(sql);
  db.selectSql(sql,function (data){
    // console.log(data[0].id);
    res.json(deleteEmployeePositionDaysWeek(data[0].id, req.body.employee.id, req.body.position.id));
  });
});

function deleteEmployeePositionDaysWeek(employee_position_calendar_id, employee_id, position_id){
  var sql = `delete from hare.employee_position_calendar where id = ${employee_position_calendar_id};`;
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
  var sql = `delete from hare.employee_position_calendar
            WHERE employee_position_fk IN (select id from hare.employees_positions where position_fk = ${req.body.id});`;
  db.selectSql(sql,function (data){
    // res.json(data);
  });
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

app.delete('/removeRequest', (req, res)=>{
  var sql = `delete from hare.request where id = ${req.body.id};`;
  db.selectSql(sql,function (data){
    res.json(data);
  });
});

//==================================================================================UPDATES

app.post('/updateRequestStatus', (req, res) => {
  const sql = `UPDATE hare.request as e
               SET e.status = "${req.body.req_status}"
               WHERE e.id = ${req.body.req_id};`;
  db.selectSql(sql, function(data){
    res.json(data);
  });
});

//==================================================================================WORKSPACE selectSql


// app.get('/getAllWorkspacesManager', function(req, res){
//   var sql = "select * from hare.workspaces;";
//   db.selectSql(sql,function (data){
//     res.json(data);
//   });
// });

app.post('/getAllWorkspacesManager', function(req, res){
  var sql = `select w.*
        from hare.workspaces as w
        join hare.users_workspaces as uw
        on uw.workspace_fk = w.id
        where uw.user_fk = ${req.body.id}`;
  db.selectSql(sql,function (data){
    res.json(data);
  });
});

app.post('/getAllWorkspacesEmployee', function(req, res){
  var sql = `select w.*
          from hare.workspaces as w
          join hare.workspaces_employee as we
          on we.workspace_fk = w.id
          where we.employee_fk = ${req.body.id}`;
  db.selectSql(sql,function (data){
    res.json(data);
  });
});


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

app.post('/getAllSinglePositionsWorkspace', function(req, res){
  var sql = `SELECT p.id, p.position_name
              FROM hare.positions as p
              JOIN hare.workspaces_positions as wp
              ON wp.position_fk = p.id
              JOIN employees_positions as ep
              ON ep.position_fk = wp.position_fk
              where wp.workspace_fk = ${req.body.selectedWorkspace.id} and ep.employee_fk = ${req.body.user.id};`;
  // var sql = `SELECT p.id, p.position_name
  //           FROM hare.positions as p
  //           JOIN hare.workspaces_positions as wp
  //           ON wp.position_fk = p.id
  //           where wp.workspace_fk = ${req.body.id};`;
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

app.post('/addWorkspace', function (req, res) {
  var sql = `insert into hare.workspaces values (null,'${req.body.workspaceName}');`;
  db.selectSql(sql,function (data){
    res.json(insertIntoUserWorkspace(data.insertId, req.body.userId));
  });
});

function insertIntoUserWorkspace(workspaceId, user){
  var sql = `insert into hare.users_workspaces values (null,${workspaceId},${user.id} );`;
  db.selectSql(sql,function (data){
    return (data);
  });
}


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

    // console.log(req.body.employee);
    const mailOptions = {
      from: '<andersonhborba@hotmail.com>',
      to: req.body.employee.email,
      subject: 'Cuckoo! You have an invitation to join a team!',
      html: `<h1>Hello ${req.body.employee.firstname} ${req.body.employee.lastname}</h1>
      <p>your username is: <strong>${req.body.employee.email}</strong></p>
      <p>your password is: <strong>${req.body.employee.password}</strong>
      <p>please follow <a href:'localhost:3000/#!/login'>this link</a> to login into your new account</p>`
    }

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    return res.json(insertIntoWorkspaceEmployee(req.body.workspace.id, data.insertId));
  });
});

function insertIntoWorkspaceEmployee(workspaceId, employeeId){
  var sql = `insert into hare.workspaces_employee values (null,${workspaceId},${employeeId} );`;
  db.selectSql(sql,function (data){
    return (createEmployeeUnavailability(employeeId, workspaceId));
  });
}

function createEmployeeUnavailability(employeeId, workspaceId){
  var sql = `insert into days_week values (null,null,null,null,null,null,null,null);`;
  db.selectSql(sql,function (data){
    return(insertIntoEmployeeUnavailability(employeeId, data.insertId, workspaceId));
  });
}

function insertIntoEmployeeUnavailability(employeeId, days_week_id, workspaceId){
  var sql = `insert into employee_unavailability_workspace values (null, ${employeeId}, ${days_week_id}, ${workspaceId});`;
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
  // var sql = `SELECT d.id
  //             FROM hare.days_week as d
  //             JOIN hare.employee_position_days_week as epd
  //             ON epd.days_week_fk = d.id
  //             JOIN hare.employees_positions as ep
  //             ON ep.id = epd.employee_position_fk
  //             where ep.position_fk = ${req.body.position.id} and ep.employee_fk = ${req.body.employee.id} ;`;
  // console.log(req.body);
  var sql = `SELECT dw.id
            FROM hare.days_week as dw
            join employee_position_calendar as epc
            on epc.days_week_fk = dw.id
            join employees_positions as ep
            on epc.employee_position_fk = ep.id
            where ep.position_fk = ${req.body.shiftData.position.id} and ep.employee_fk = ${req.body.shiftData.employee.id}
            and epc.week_number = ${req.body.week.week_number} and epc.year_number = ${req.body.week.year_number};`;

  var positionId = req.body.shiftData.position.id;
  var employeeId = req.body.shiftData.employee.id;
  var new_shift = req.body.shiftData.new_shift;
  var key = req.body.shiftData.key;
  var week = req.body.week;
  db.selectSql(sql,function (data){
    // return res.json(insertUpdateShift(data, new_shift, key));
    return res.json(insertShiftLogic(data, new_shift, key, week, employeeId, positionId));
  });
});

function insertShiftLogic(data, new_shift, key, week, employeeId, positionId){
  if(data[0] == null){
    return getEmployeePositionKey(employeeId, positionId, week, new_shift, key);
  }else{
    return insertUpdateShift(data[0].id, new_shift, key);
  }
}

function insertUpdateShift(daysWeek, new_shift, key){
  let day = getDayFromId(key);
  var sql = `update days_week set ${day} = ${new_shift} where id = ${daysWeek};`;
  db.selectSql(sql,function (data){
    return (returnShiftProcess(data));
  });
}

function returnShiftProcess(data){
  return data;
}

function getEmployeePositionKey(employeeId, positionId, week, new_shift, key){
  var sql = `select ep.id
            from employees_positions as ep
            where employee_fk = ${employeeId} and position_fk = ${positionId};`;
  db.selectSql(sql,function (data){
    // console.log("POS/EMP ID");
    // console.log(data[0].id);
    return(createDaysWeekForCalendar(data[0].id, week, new_shift, key));
  });
}

function createDaysWeekForCalendar(employees_positions_id, week, new_shift, key){
  let day = getDayFromId(key);
  var sql = `insert into days_week (${day}) values (${new_shift});`;
  // var sql = `update days_week set ${day} = ${new_shift} where id = ${daysWeek};`;
  db.selectSql(sql,function (data){
    return(insertIntoPositionCalendar(employees_positions_id, data.insertId, week, new_shift, key));
  });
}

function insertIntoPositionCalendar(employees_positions_id, days_week_id, week, new_shift, key){
  var sql = `insert into employee_position_calendar values (null, ${employees_positions_id}, ${days_week_id}, ${week.week_number}, ${week.year_number});`;
  db.selectSql(sql,function (data){
    return (data);
    // return(insertUpdateShift(days_week_id, new_shift, key));
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


app.post('/getWorkSpaceEmployeeUnavailability', function(req, res){
  // console.log(req.body);
  db.getUnavailability(req.body.selectedWorkspace.id, req.body.employee.id, function (data){
    res.json(data);
  });
});

// app.post('/updateUnavailability', function (req, res) {
//   var sql = `update hare.shift set shift_start = '${req.body.data.shift_start}:00', shift_end = '${req.body.data.shift_end}:00' where id = ${req.body.shift.id};`;
//   db.selectSql(sql,function (data){
//     return (data);
//   });
// });

// app.post('/updateUnavailability', function (req, res) {
//   var sql = `insert into hare.shift values (null,'${req.body.data.shift_start}:00','${req.body.data.shift_end}:00');`;
//   db.selectSql(sql,function (data){
//     return res.json(insertIntoWorkspaceShift(req.body.workspace.id, data.insertId));
//   });
// });
//
// function insertIntoWorkspaceShift(workspaceId, shiftId){
//   var sql = `insert into hare.workspaces_shift values (null,${workspaceId},${shiftId} );`;
//   db.selectSql(sql,function (data){
//     return (data);
//   });
// }


app.post('/updateUnavailability', function (req, res) {
  var sql = `SELECT dw.id
              FROM hare.days_week as dw
              join employee_unavailability_workspace as euw
              on euw.days_week_fk = dw.id
              where euw.workspace_fk = ${req.body.workspace.id} and euw.employee_fk = ${req.body.employee.id};`;
  var key = req.body.data.key;
  db.selectSql(sql,function (data){
    return res.json(insertShift(data[0].id, req.body.data.shift_start, req.body.data.shift_end, key));
  });
});

function insertShift(days_week_id, shift_start, shift_end, key) {
  var sql = `insert into hare.shift values (null,'${shift_start}:00','${shift_end}:00');`;
  db.selectSql(sql,function (data){
    return (insertUpdateShift2(days_week_id, data.insertId, key));
  });
};

function insertUpdateShift2(daysWeek, new_shift, key){
  let day = getDayFromId(key);
  var sql = `update days_week set ${day} = ${new_shift} where id = ${daysWeek};`;
  db.selectSql(sql,function (data){
    return (data);
  });
}


app.post('/getUnavailabilityOfaDay', function (req, res) {
  let day = getDayFromId(req.body.key);
  var sql2 = `SELECT s.*
              FROM hare.shift as s
              join hare.days_week as dw
              on s.id = dw.${day}
              join employee_unavailability_workspace as euw
              on euw.days_week_fk = dw.id
              where euw.workspace_fk = ${req.body.workspace.id} and euw.employee_fk = ${req.body.employee.id};`;
  // console.log(sql2);
  db.selectSql(sql2,function (data){
    return res.json(data);
  });
});


//module.exports = app;
app.listen(port, () => console.log(`Listening on port ${port}!`))
