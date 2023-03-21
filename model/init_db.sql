DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS connections; 
DROP TABLE IF EXISTS events;

CREATE TABLE users (
userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(200) NOT NULL,
email VARCHAR(150) NOT NULL,
age INT,
gender VARCHAR(100),
location VARCHAR(100),
occupation VARCHAR(100),
languages VARCHAR(200),
interests VARCHAR(400),
about VARCHAR(400),
avatarURL longblob
);

INSERT INTO users (username, password, email, age, gender, location, occupation, languages, interests, about) VALUES 
('Bob', '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W', 'bob@email.com', 35, 'male', 'Barcelona', 'Chef', 'spanish', 'hiking', 'I am Bob, a professional chef. After an event together I would treat you to my delicious paella'),
('Hannah', '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W', 'hannah@email.com', 30, 'female', 'Paris', 'Software engineer', 'french', 'snowboarding', 'I am Hannah'),
('Lucy', '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W', 'lucy@email.com', 23, 'female', 'Barcelona', 'Acrobat', 'spanish', 'painting', 'I am Lucy'),
('Juan Jose', "$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W", 'juany@email.com', 87, 'male', 'Barcelona', 'Retired', 'english', 'snowboarding', 'I am Juan Jose');

CREATE TABLE events (
eventId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
eventName VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO events (eventName) VALUES 
('Backstreet Boys Concert'),
('Cher Concert');

CREATE TABLE connections (
connectId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
inviterId INT NOT NULL,
inviteeId INT NOT NULL,
eventiD INT NOT NULL,
accepted BOOLEAN,
FOREIGN KEY (inviterId) REFERENCES users(userId),
FOREIGN KEY (inviteeId) REFERENCES users(userId),
FOREIGN KEY (eventId) REFERENCES events(eventId)
);

INSERT INTO connections (inviterId, inviteeId, eventId, accepted) VALUES 
(1, 2, 1, NULL);