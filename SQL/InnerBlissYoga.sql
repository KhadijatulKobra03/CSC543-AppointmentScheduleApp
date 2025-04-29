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

