CREATE TABLE users (
  id       INT AUTO_INCREMENT,
  user_name    VARCHAR(250) NOT NULL,
  email    VARCHAR(250) NOT NULL,
  user_password  VARCHAR(250) NOT NULL,

  UNIQUE KEY unique_email (email),
  PRIMARY KEY     (id)
);

CREATE TABLE positions (
  id       INT AUTO_INCREMENT,
  position_name    VARCHAR(250) NOT NULL
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(250) NOT NULL,
  last_name VARCHAR(250) NOT NULL,
  email VARCHAR(250) NOT NULL,
  password VARCHAR(250) NOT NULL,

  UNIQUE KEY unique_mail (email),
  PRIMARY KEY (id)
);

CREATE TABLE workspaces (
  id       INT AUTO_INCREMENT,
  workspace_name    VARCHAR(250) NOT NULL,

  PRIMARY KEY     (id)
);

CREATE TABLE users_workspaces (
  id       INT AUTO_INCREMENT,
  workspace_fk    INT  NOT NULL,
  user_fk    INT  NOT NULL,

  PRIMARY KEY     (id),
  FOREIGN KEY (workspace_fk) REFERENCES workspaces(id),
  FOREIGN KEY (user_fk) REFERENCES users(id)
);

CREATE TABLE employees_positions (
  id       INT AUTO_INCREMENT,
  employee_fk    INT  NOT NULL,
  position_fk    INT  NOT NULL,

  PRIMARY KEY     (id),
  FOREIGN KEY (employee_fk) REFERENCES employee(id),
  FOREIGN KEY (position_fk) REFERENCES positions(id)
);

CREATE TABLE workspaces_positions (
  id       INT AUTO_INCREMENT,
  workspace_fk    INT  NOT NULL,
  position_fk    INT  NOT NULL,

  PRIMARY KEY     (id),
  FOREIGN KEY (workspace_fk) REFERENCES workspaces(id),
  FOREIGN KEY (position_fk) REFERENCES positions(id)
);

CREATE TABLE workspaces_employee (
  id       INT AUTO_INCREMENT,
  workspace_fk    INT  NOT NULL,
  employee_fk    INT  NOT NULL,

  PRIMARY KEY     (id),
  FOREIGN KEY (workspace_fk) REFERENCES workspaces(id),
  FOREIGN KEY (employee_fk) REFERENCES employee(id)
);

CREATE TABLE shift (
  id       INT AUTO_INCREMENT,
  shift_start   TIME NOT NULL,
  shift_end   TIME NOT NULL,
  PRIMARY KEY     (id)
);

CREATE TABLE workspaces_shift (
  id       INT AUTO_INCREMENT,
  workspace_fk    INT  NOT NULL,
  shift_fk    INT  NOT NULL,

  PRIMARY KEY     (id),
  FOREIGN KEY (workspace_fk) REFERENCES workspaces(id),
  FOREIGN KEY (shift_fk) REFERENCES shift(id)
);



CREATE TABLE days_week (
  id       INT AUTO_INCREMENT,
  monday_fk    INT ,
  tuesday_fk    INT ,
  wednesday_fk    INT ,
  thursday_fk    INT ,
  friday_fk    INT ,
  saturday_fk    INT ,
  sunday_fk    INT ,

  PRIMARY KEY     (id),
  FOREIGN KEY (monday_fk) REFERENCES shift(id),
  FOREIGN KEY (tuesday_fk) REFERENCES shift(id),
  FOREIGN KEY (wednesday_fk) REFERENCES shift(id),
  FOREIGN KEY (thursday_fk) REFERENCES shift(id),
  FOREIGN KEY (friday_fk) REFERENCES shift(id),
  FOREIGN KEY (saturday_fk) REFERENCES shift(id),
  FOREIGN KEY (sunday_fk) REFERENCES shift(id)
);

CREATE TABLE employee_position_days_week (
  id       INT AUTO_INCREMENT,
  employee_position_fk    INT  NOT NULL,
  days_week_fk    INT  NOT NULL,

  PRIMARY KEY     (id),
  FOREIGN KEY (employee_position_fk) REFERENCES employees_positions(id),
  FOREIGN KEY (days_week_fk) REFERENCES days_week(id)
);


CREATE TABLE employee_position_calendar(
  id       INT AUTO_INCREMENT,
  employee_position_fk    INT  NOT NULL,
  days_week_fk    INT  NOT NULL,
  week_number    INT  NOT NULL,
  year_number    INT  NOT NULL,

  PRIMARY KEY     (id),
  FOREIGN KEY (employee_position_fk) REFERENCES employees_positions(id),
  FOREIGN KEY (days_week_fk) REFERENCES days_week(id)
);

CREATE TABLE request(
  id      INT AUTO_INCREMENT,
  content VARCHAR(250) NOT NULL,
  status VARCHAR(250) NOT NULL,
  day DATE NOT NULL,
  time_start TIME NOT NULL,
  time_end TIME NOT NULL,
  employee_fk INT NOT NULL,
  workspace_fk INT NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (employee_fk) REFERENCES employee (id),
  FOREIGN KEY (workspace_fk) REFERENCES workspaces(id)
);

CREATE TABLE employee_unavailability_workspace(
  id       INT AUTO_INCREMENT,
  employee_fk    INT  NOT NULL,
  days_week_fk    INT  NOT NULL,
  workspace_fk    INT  NOT NULL,

  PRIMARY KEY     (id),
  FOREIGN KEY (employee_fk) REFERENCES employee(id),
  FOREIGN KEY (days_week_fk) REFERENCES days_week(id),
  FOREIGN KEY (workspace_fk) REFERENCES workspaces(id)
);

