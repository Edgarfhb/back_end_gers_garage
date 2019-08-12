const db = require("../config/db.config.js");
const response = require("../serviceUtil/serviceUtil.js");

const Users = db.cct.users;

checkDupRegNumberOrEmail = (req, res, next) => {
  // Check Registration Number is already in use
  Users.findOne({
    attributes: ["id"],
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      return res
        .status(200)
        .send(
          response.getErrorResponseCustom(
            200,
            "Email already registered"
          )
        );
    }
    else{
      next();      
    }
  });
};

const RegistrationVerify = {};
RegistrationVerify.checkDupRegNumberOrEmail = checkDupRegNumberOrEmail;

module.exports = RegistrationVerify;
