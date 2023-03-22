var express = require("express");
var router = express.Router();
require("dotenv").config();
const db = require("../model/helper");
const Pusher = require("pusher");

const GET_MESSAGE_COUNT = 5;

//starting connection between server and push
const channel = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});

//get the most recent messages for channel
router.get("/:senderId/:receiverId", async function (req, res) {
  let { senderId, receiverId } = req.params; //from the url

  try {
    //each message has a specific sender id and receiver id so i need to select the message that
    //specifically has this sendId and specifically this receiverId of this message
    let sql = `
            SELECT * FROM messages
            WHERE senderId IN (${senderId}, ${receiverId}) AND
                receiverId IN (${senderId}, ${receiverId})
            ORDER BY dateTime DESC 
            LIMIT ${GET_MESSAGE_COUNT}
        `;
    let result = await db(sql);
    res.send(result.data.reverse());
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

//save new message and database and send to pusher
router.post("/:senderId/:receiverId", async function (req, res) {
  let { senderId, receiverId } = req.params;
  let { text, socketId } = req.body;

  let text4db = text.replace(/\'/g, "\\'");
  let completeMsg = null;

  try {
    let sql = ` INSERT INTO messages (senderId, receiverId, text)
            VALUES (${senderId}, ${receiverId}, '${text4db}');
            SELECT LAST_INSERT_ID()`;
    let results = await db(sql);
    let completeMsgId = results.data[0].insertId;

    results = await db(`select * from messages where id = ${completeMsgId}`);
    completeMsg = results.data[0];
  } catch (err) {
    res.status(500).send({ err: err.message });
    return;
  }

  let ids = [senderId, receiverId].sort();
  let channelName = "channel-" + ids.join("-");

  channel.trigger(channelName, "message", completeMsg, { socket_id: socketId });
  res.send(completeMsg);
});

module.exports = router;
