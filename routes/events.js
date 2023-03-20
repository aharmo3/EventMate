var express = require("express");
const eventsRouter = express.Router();
var db = require("../model/helper");

// -------------------------- GET ROUTES ---------------------------------

//get all events
eventsRouter.get("/", async function (req, res, next) {
    let sql = "SELECT * FROM events ORDER BY eventid";
  
    try {
      let results = await db(sql);
      let events = results.data;
      res.send(events);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// get event by event id - e.g. to access the event details
eventsRouter.get("/:eventid",  async (req, res) => {
    let eventid = req.params.eventid;
    let sql = 
    `SELECT * FROM events WHERE eventId = ${eventid} AND eventdetail = "yes";`
    try {
      let results = await db(sql);
      let event = results.data[0];
      res.send(event);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });


//get event by ticketmasterid - e.g. to check if it's in the db
eventsRouter.get("/ticketmaster/:ticketmasterid",  async (req, res) => {
    let ticketmasterId = req.params.ticketmasterid;
    let sql = 
    `SELECT * FROM events WHERE ticketmasterid = ${ticketmasterId};`
  
    try {
      let results = await db(sql);
      let event = results.data[0];
      res.send(event);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

//get all user ids from event by ticketmasterid 
eventsRouter.get("/user/ticketmaster/:ticketmasterid",  async (req, res) => {
    let ticketmasterId = req.params.ticketmasterid;
    let sql = 
    `SELECT userId FROM events WHERE ticketmasterid = ${ticketmasterId};`
  
    try {
      let results = await db(sql);
      let event = results.data[0];
      res.send(event);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// get events by user id - e.g. show "my events"
eventsRouter.get("/user/:userid",  async (req, res) => {
    let userId = req.params.userid;
    let sql = 
    `SELECT * FROM events WHERE userId = ${userId};`
  
    try {
      let results = await db(sql);
      let event = results.data[0];
      res.send(event);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });


// -------------------------- POST ROUTES ---------------------------------


// -------------------------- PUT ROUTES ---------------------------------


// -------------------------- DELETE ROUTES ---------------------------------

// // Will eventually get all users matched on an event
// router.get("/matched", async function (req, res, next) {
//   let sql = "SELECT * FROM users";

//   try {
//     let results = await db(sql);
//     let users = results.data;
//     if (users.length === 0) {
//       res.status(404).send({ error: "No users found" });
//     } else {
//       users.forEach((u) => delete u.password); // don't return passwords
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });



// // Add a new user
// router.post("/", async (req, res) => {
//   let {
//     username,
//     email,
//     age,
//     gender,
//     location,
//     occupation,
//     languages,
//     interests,
//     about,
//     avatarURL,
//   } = req.body;
//   let sql = `insert into users(username, email,age, gender, location, occupation, languages, interests, about, avatarURL) values("${username}","${email}", ${age}, "${gender}", "${location}", "${occupation}", "${languages}", "${interests}"," ${about}", "${avatarURL}") `;

//   try {
//     await db(sql);
//     let results = await db(`select * from users`);
//     res.status(201).send(results);
//   } catch (err) {
//     res.status(500).send({ err: err.message });
//   }
// });

// // For secondary registration page
// router.put("/:id", async (req, res) => {
//   let userId = req.params.id;
//   let sql = `SELECT * FROM users WHERE userId = ${userId}`;

//   try {
//     let results = await db(sql);

//     if (results.data.length === 0) {
//       res.status(404).send({ error: "User not found" });
//     } else {
//       let {
//         age,
//         gender,
//         location,
//         occupation,
//         languages,
//         interests,
//         about,
//         avatarURL,
//       } = req.body;

//       let sql = `
//         UPDATE users
//         SET
//         age = "${age}",
//         gender = "${gender}",
//         location = "${location}",
//         occupation = "${occupation}",
//         languages = "${languages}",
//         interests = "${interests}",
//         about = "${about}",
//         avatarURL = "${avatarURL}"
//         WHERE userId = "${userId}"
//       `;
//       await db(sql);
//       let results = await db(`SELECT * FROM users WHERE userId = ${userId}`);
//       res.send(results.data);
//     }
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

module.exports = eventsRouter;