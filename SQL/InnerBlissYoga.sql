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

INSERT INTO users (username, email, password)
VALUES
('alice', 'alice@example.com', 'pass124'),
('bob', 'bob@example.com', 'pass12345'),
('carol', 'carol@example.com', 'pass789'),
('dave', 'dave@example.com', 'pass888'),
('emma', 'emma@example.com', 'pass123');

CREATE TABLE event_registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  event_name VARCHAR(100) NOT NULL,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE classes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);


INSERT INTO classes (name) VALUES
('Beginner Yoga'),
('Intermediate Yoga'),
('Advanced Yoga'),
('Meditation'),
('Gentle Yoga'),
('Chair Yoga'),
('Kids and Teens Yoga');


CREATE TABLE class_bookings (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  class_id INT NOT NULL,
  class_date DATE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE RESTRICT
 
);
INSERT INTO class_bookings (user_id, class_id, class_name, class_date, first_name, last_name, email)
VALUES
(1, 1, '2025-06-03', 'Alice', 'Smith', 'alice@example.com'),
(2, 2, '2025-06-06', 'Bob', 'Johnson', 'bob@example.com'),
(1, 2, '2025-06-10', 'Alice', 'Smith', 'alice@example.com'),
(2, 1, '2025-06-13', 'Bob', 'Johnson', 'bob@example.com');

