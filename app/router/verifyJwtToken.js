const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const response = require("../serviceUtil/serviceUtil.js");

//nota: verificar token, hay que formatear las respuetas.
verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send(response.getErrorResponse(403));
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send(response.getErrorResponse(401));
    }
    req.user_id = decoded.id;
    next();
  });
};

const authJwt = {};
authJwt.verifyToken = verifyToken;

module.exports = authJwt;
