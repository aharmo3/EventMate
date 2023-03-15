var express = require("express");
var router = express.Router();
var db = require("../model/helper");
const { ensureSameUser } = require("../middleware/guards");

router.get("/", async function (req, res, next) {
  let sql = "SELECT * FROM users ORDER BY username";

  try {
    let results = await db(sql);
    let users = results.data;
    users.forEach((u) => delete u.password); // don't return passwords
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/:id", ensureSameUser, async (req, res) => {
  let userId = req.params.id;
  let sql = `select * from users where userId = ${userId}`;

  try {
    let results = await db(sql);
    // We know user exists because he/she is logged in!
    let user = results.data[0];
    delete user.password; // don't return the password
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  let {
    username,
    email,
    age,
    gender,
    location,
    occupation,
    languages,
    interests,
    about,
    avatarURL,
  } = req.body;
  let sql = `insert into users(username, email,age, gender, location, occupation, languages, interests, about, avatarURL) values("${username}","${email}", ${age}, "${gender}", "${location}", "${occupation}", "${languages}", "${interests}"," ${about}", "${avatarURL}")  `;

  try {
    await db(sql);
    let results = await db(`select * from users`);
    res.status(201).send(results);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

module.exports = router;
