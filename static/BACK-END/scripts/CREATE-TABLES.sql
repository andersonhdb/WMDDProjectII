CREATE TABLE users (
  id       INT AUTO_INCREMENT,
  user_name    VARCHAR(250) NOT NULL,
  email    VARCHAR(250) NOT NULL,
  user_password  VARCHAR(250) NOT NULL,

  UNIQUE KEY unique_email (email),
  PRIMARY KEY     (id)
);

/*   TESTs   */

select * from hare.users;

insert into hare.users values (null ,'First','first@email.com','first_password');