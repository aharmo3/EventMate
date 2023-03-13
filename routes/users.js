var express = require("express");
var router = express.Router();
var db = require("../model/helper");

router.get("/:id", async (req, res) => {
  let sql = `select * from users where id = ${userId}`;

  let results = await db(sql);

  try {
    if (results.data.length === 0) {
      res.status(404).send(`User not found`);
    } else {
      res.send(results.data[0]);
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
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
