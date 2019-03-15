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


