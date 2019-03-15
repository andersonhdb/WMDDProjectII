
/*   TESTs   */

select * from hare.users;

insert into hare.users values (null ,'First','first@email.com','first_password');

select * from hare.positions;


select * from hare.workspaces;

select * from hare.users_workspaces;


select * from hare.employee;

insert into hare.users_workspaces values (null,1,2);

select * from hare.employees_positions;



SELECT e.id, e.first_name, e.last_name, e.email, e.password
FROM hare.employee as e
JOIN hare.employees_positions as ep 
ON ep.employee_fk = e.id
where ep.position_fk = 2;


SELECT p.id, p.position_name
FROM hare.positions as p
JOIN hare.workspaces_positions as wp 
ON wp.position_fk = p.id
where wp.workspace_fk = 2;


delete from hare.positions ;


select * from shift;
insert into shift values(null, '22:00', '17:00');


/*========================================*/

SELECT d.monday_fk, d.tuesday_fk, d.wednesday_fk, d.thursday_fk, d.friday_fk, d.saturday_fk, d.sunday_fk
FROM hare.days_week as d
JOIN hare.employee_position_days_weekemployee_position_days_week as epd
ON epd.days_week_fk = d.id
JOIN hare.employees_positions as ep
ON ep.id = epd.employee_position_fk
where ep.position_fk = 27 and ep.employee_fk = 24 ;


select * from shift;
select * from days_week;
insert into days_week values (null,4,null,null,null,null,null,null);
select * from employee_position_days_week;
insert into employee_position_days_week values (null, 110, 1);
select * from employees_positions;

select * from positions where id = 27;
select * from employee where id = 20;

update days_week set tuesday_fk = 4, wednesday_fk = 3, thursday_fk = 5, friday_fk = 1, sunday_fk = 4 where id = 1;


SELECT d.id
FROM hare.days_week as d
JOIN hare.employee_position_days_week as epd
ON epd.days_week_fk = d.id
JOIN hare.employees_positions as ep
ON ep.id = epd.employee_position_fk
where ep.position_fk = 27 and ep.employee_fk = 20 ;


select epdw.* 
from employee_position_days_week as epdw
join employees_positions as ep
on ep.id = epdw.employee_position_fk
where ep.employee_fk = 20 and position_fk = 27 
