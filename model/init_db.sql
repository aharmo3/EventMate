DROP TABLE IF EXISTS connections; 
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users; 
DROP TABLE IF EXISTS files;



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
avatarURL VARCHAR(200)

);

INSERT INTO users (username, password, email, age, gender, location, occupation, languages, interests, about, avatarURL) VALUES 
('Bob', '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W', 'bob@email.com', 35, 'Male', 'Barcelona, Spain', 'Chef', 'Spanish', 'Acting, Amateur radio, Aquascaping', 'I am Bob, a professional chef. After an event together I would treat you to my delicious paella', 
'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
('Hannah', '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W', 'hannah@email.com', 30, 'Female', 'Barcelona, Spain', 'Software engineer', 'French, Spanish, English', 'Snowboarding,Candy Making', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
'https://she-explores.com/wp-content/uploads/2018/02/Jean-Drummond-Outdoors-After-Fifty-12.jpg'),
('Lucy', '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W', 'lucy@email.com', 23, 'Female', 'Barcelona, Spain', 'Acrobat', 'Spanish', 'Painting, Aquascaping, Baking', 'Hi! My name is Lucy. I love going to see shows.', 
'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
('Juan Jose', "$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W", 'juany@email.com', 23, 'Male', 'Barcelona, Spain', 'Retired', 'English', 'Snowboarding, Candy Making, Slacklining', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
'https://c.stocksy.com/a/gW6700/z9/1693386.jpg');


CREATE TABLE events (
`eventid` INT NOT NULL AUTO_INCREMENT,    
`userId` INT,
ticketmasterid VARCHAR(100) NOT NULL,
eventname VARCHAR(200),
eventdate VARCHAR(100),
starttime VARCHAR(100),
imageurl VARCHAR(200),
eventlocation VARCHAR(100),
venue VARCHAR(100),
currency VARCHAR(100),
startingprice VARCHAR(100),
ticketurl VARCHAR(200),
genre  VARCHAR(100),
subgenre VARCHAR(100),
host VARCHAR(100),
eventtype VARCHAR(100),
socialmedia VARCHAR(100),
eventdetail VARCHAR(100) DEFAULT "No",
PRIMARY KEY (`eventid`)
);

CREATE TABLE connections (
connectId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
inviterId INT NOT NULL,
inviteeId INT NOT NULL,
eventId INT NOT NULL,
accepted BOOLEAN,
FOREIGN KEY (inviterId) REFERENCES users(userId),
FOREIGN KEY (inviteeId) REFERENCES users(userId),
FOREIGN KEY (eventId) REFERENCES events(eventId)
);




CREATE TABLE messages (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
senderId INT NOT NULL,
receiverId INT NOT NULL,
text VARCHAR(250) NOT NULL,
dateTime DATETIME DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (senderId) REFERENCES users(userId),
FOREIGN KEY (receiverId) REFERENCES users(userId));


INSERT INTO events (userid,ticketmasterid, eventname, eventdate, starttime, imageurl, eventlocation, venue , currency, startingprice, ticketurl, genre, subgenre, host, eventtype, socialmedia, eventdetail) VALUES 
(1, "G5diZ94NPjotW", "Shania Twain: Queen Of Me Tour", "2023-07-11", "19:30:00", "https://s1.ticketm.net/dam/a/1d1/47cc9b10-4904-4dec-b1d6-539e44a521d1_1825531_RETINA_PORTRAIT_3_2.jpg", "New York, USA", "Madison Square Garden" , "USD", 65.95, "https://www.ticketmaster.com/shania-twain-queen-of-me-tour-new-york-new-york-07-11-2023/event/3B005D58E5711A7D", "Country", "Country", null, "Music", null, "yes"),
(2, "Z698xZ2qZaFpK", "BEYONCÉ - RENAISSANCE WORLD TOUR", "2023-06-08", "19:30:00", "https://s1.ticketm.net/dam/a/9ff/750d0e9b-b2c2-4b82-8898-edb3d8dca9ff_SOURCE", "Barcelona, Spain", "Estadi Olímpic Lluis Companys", "USD", 65.95, "https://www.ticketmaster.es/event/beyonce-renaissance-world-tour-entradas/34195", "Country", "Country", null, "Music", null, "yes"),
(3, "Z698xZ2qZaF4h", "Vida Records & Friends: Socunbohemio", "2023-03-30", "19:30:00", "https://s1.ticketm.net/dam/a/241/05caf6e3-6e37-4735-8074-1f83d383b241_1843941_RETINA_PORTRAIT_3_2.jpg", "Barcelona, Spain", "La Nau", "USD", 65.95, "https://www.ticketmaster.es/event/vida-records--friends-socunbohemio-entradas/34139",
"Alternative Rock", "Alternative Rock", null, "Music", null, "yes"),
(3, "Z698xZ2qZaFpK", "BEYONCÉ - RENAISSANCE WORLD TOUR", "2023-06-08", "19:30:00", "https://s1.ticketm.net/dam/a/9ff/750d0e9b-b2c2-4b82-8898-edb3d8dca9ff_SOURCE", "Barcelona, Spain", "Estadi Olímpic Lluis Companys", "USD", 65.95, "https://www.ticketmaster.es/event/beyonce-renaissance-world-tour-entradas/34195", "Country", "Country", null, "Music", null, "yes"),
(4, "Z698xZ2qZaFpK", "BEYONCÉ - RENAISSANCE WORLD TOUR", "2023-06-08", "19:30:00", "https://s1.ticketm.net/dam/a/9ff/750d0e9b-b2c2-4b82-8898-edb3d8dca9ff_SOURCE", "Barcelona, Spain", "Estadi Olímpic Lluis Companys", "USD", 65.95, "https://www.ticketmaster.es/event/beyonce-renaissance-world-tour-entradas/34195", "Country", "Country", null, "Music", null, "yes"),
(1, "Z698xZ2qZaFpK", "BEYONCÉ - RENAISSANCE WORLD TOUR", "2023-06-08", "19:30:00", "https://s1.ticketm.net/dam/a/9ff/750d0e9b-b2c2-4b82-8898-edb3d8dca9ff_SOURCE", "Barcelona, Spain", "Estadi Olímpic Lluis Companys", "USD", 65.95, "https://www.ticketmaster.es/event/beyonce-renaissance-world-tour-entradas/34195", "Country", "Country", null, "Music", null, "yes");


INSERT INTO connections (inviterId, inviteeId, eventId, accepted) VALUES 
-- BOB invited LUCY (She is not sure how she feels)
(1, 3, 1, NULL),
(2, 3, 3, NULL),
(4, 3, 2, NULL),

-- LUCY invited Juan (he rejected her :(  )
(3, 4, 3, 0),
-- LUCY invited Hannah (She is still waiting)
(3, 2, 3, NULL),



-- HANNAH invited LUCY(and they confirmed)
(2, 3, 2, 1);





CREATE TABLE files (
id INT NOT NULL AUTO_INCREMENT, 
filename VARCHAR(100) NOT NULL,
uploadedOn DATETIME DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id)
);