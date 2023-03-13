var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
  console.log("in here")
  res.send({'welcome': 'welcome'});
})

module.exports = router;
