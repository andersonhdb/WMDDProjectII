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

