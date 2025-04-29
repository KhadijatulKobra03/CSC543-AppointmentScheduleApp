DROP DATABASE IF EXISTS yoga_database;
CREATE DATABASE yoga_database;
USE yoga_database;

-- Table: newsletter_signup

DROP TABLE IF EXISTS newsletter_signup;
CREATE TABLE newsletter_signup (
    newsletter_user_id INT AUTO_INCREMENT PRIMARY KEY,
    newsletter_first_name VARCHAR(255) NOT NULL,
    newsletter_last_name VARCHAR(255) NOT NULL,
    newsletter_email VARCHAR(255) NOT NULL
);

-- Insert data for users that signed up for newsletter

INSERT INTO newsletter_signup (newsletter_user_id, newsletter_first_name, newsletter_last_name, newsletter_email) VALUES
(1, 'John', 'Smith', 'jsmith@email.com'),
(2, 'Bob', 'Brown', 'bobby@gmail.com');


--Khadija's 

Create Database yoga_database;
use yoyga_user;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(20)
);

CREATE TABLE event_registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  event_name VARCHAR(100) NOT NULL,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

