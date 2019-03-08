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
  position_name    VARCHAR(250) NOT NULL,

  UNIQUE KEY unique_name (position_name),
  PRIMARY KEY     (id)
);
