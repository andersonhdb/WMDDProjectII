
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



