const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

function ensureUserLoggedIn(req, res, next) {
  let token = _getToken(req);

  try {
    //see if there is a token
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

function ensureSameUser(req, res, next) {
  let token = _getToken(req);

  try {
    let payload = jwt.verify(token, SECRET_KEY);
    if (payload.userId === Number(req.params.userId)) {
      next();
    } else {
      res.status(403).send({ error: `Forbidden` });
    }
  } catch (err) {
    res.status(501).send({ error: `Unauthorized` });
  }
}

function _getToken(req) {
  // Return '' if header not found
  if (!("authorization" in req.headers)) {
    return "";
  }

  // Split header into 'Bearer' and token
  let authHeader = req.headers["authorization"];
  let [str, token] = authHeader.split(" ");

  return str === "Bearer" ? token : "";
}

module.exports = {
  ensureUserLoggedIn,
  ensureSameUser,
};
