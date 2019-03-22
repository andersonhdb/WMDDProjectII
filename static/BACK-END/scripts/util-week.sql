
select * from days_week;
/*CALENDAR
employee_position_calendar*/
select * from employee_position_days_week;
select * from employees_positions;


SELECT d.id
FROM hare.days_week as d
JOIN hare.employee_position_days_week as epd
ON epd.days_week_fk = d.id
JOIN hare.employees_positions as ep
ON ep.id = epd.employee_position_fk
where ep.position_fk = 38 and ep.employee_fk = 40 ;
/*where ep.position_fk = ${req.body.position.id} and ep.employee_fk = ${req.body.employee.id} ;*/


/**===========================================================================================================*/


SELECT d.id
FROM hare.days_week as d
JOIN hare.employee_position_days_week as epd
ON epd.days_week_fk = d.id
JOIN hare.employees_positions as ep
ON ep.id = epd.employee_position_fk
where ep.position_fk = 38 and ep.employee_fk = 40 ;

/*   /\   */


SELECT dw.*
FROM hare.days_week as dw
join employee_position_calendar as epc
on epc.days_week_fk = dw.id
join employees_positions as ep
on epc.employee_position_fk = ep.id
where ep.position_fk = 38 and ep.employee_fk = 42 and epc.week_number = 13 and epc.year_number = 2019;

insert into employee_position_calendar values (null, 165, 44, 13, 2019);
insert into days_week values (null,null,null,null,null,null,null,null);


update days_week set tuesday_fk = 9, friday_fk = 9 where id = 44;

select * from days_week where id > 41;


select * from employees_positions
where employee_fk = 42 and position_fk = 38;



select * from shift;



select * from days_week;



select * from employee;
select * from employees_positions;
select * from employee_position_calendar;


select * from employee_position_calendar;




select * from days_week;
select * from employee_position_days_week;
select * from employees_positions;



/*
select epc.*
from employee_position_calendar as epc
join employees_positions as ep
on ep.id = epc.employee_position_fk
where ep.employee_fk = ${req.body.employee.id} and position_fk = ${req.body.position.id};*/



delete from hare.employee_position_calendar
WHERE employee_position_fk IN (select id from hare.employees_positions where position_fk = 47);


select * from employee;

select * from workspaces;

SELECT p.id, p.position_name
FROM hare.positions as p
JOIN hare.workspaces_positions as wp
ON wp.position_fk = p.id
JOIN employees_positions as ep
ON ep.position_fk = wp.position_fk
where wp.workspace_fk = 8 and ep.employee_fk = 40;
