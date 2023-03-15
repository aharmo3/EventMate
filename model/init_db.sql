DROP TABLE IF EXISTS users; 

CREATE TABLE users (
userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(100),
email VARCHAR(150),
age INT,
gender VARCHAR(100),
location VARCHAR(100),
occupation VARCHAR(100),
languages VARCHAR(200),
interests VARCHAR(400),
about VARCHAR(400),
avatarURL VARCHAR(150));

INSERT INTO users (username, email, age, gender, location, occupation, languages, interests, about, avatarURL) VALUES 
('Bob', 'bob@email.com', 35, 'male', 'Barcelona', 'Chef', 'spanish', 'hiking', 'I am Bob, a professional chef. After an event together I would treat you to my delicious paella', 'https://i.pravatar.cc/150?img=68'),
('Hannah', 'hannah@email.com', 30, 'female', 'Paris', 'Software engineer', 'french', 'snowboarding', 'I am Hannah', 'https://i.pravatar.cc/150?img=34'),
('Juan Jose', 'juany@email.com', 87, 'male', 'Barcelona', 'Retired', 'english', 'snowboarding', 'I am Juan Jose', 'https://i.pravatar.cc/150?img=63'),
('Lucy', 'lucy@email.com', 23, 'female', 'Barcelona', 'Acrobat', 'spanish', 'painting', 'I am Lucy', 'https://i.pravatar.cc/150?img=16');