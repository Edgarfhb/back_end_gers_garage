const db = require("../config/db.config.js");
const config = require("../config/config.js");
const response = require("../serviceUtil/serviceUtil.js");

const bcrypt = require("bcryptjs");

const Users = db.cct.users;

exports.userSignUp = (req, res) => {
  Users.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  })
    .then(data => {
      res.status(201).send(response.getResponse(201));
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(response.getErrorResponse(500));
    });
};
