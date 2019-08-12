const db = require("../config/db.config.js");
const config = require("../config/config.js");
const response = require("../serviceUtil/serviceUtil.js");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = db.cct.users;
const Admins = db.cct.admin;

exports.loginUserDashboard = (req, res) => {
  Users.findOne({
    attributes: ["id", "email", "password"],
    where: {
      email: req.body.email
    }
  })
    .then(data => {
      //console.log(bcrypt.hashSync(req.body.password, 10));
      //compare password from database and user input
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        data.password
      );

      if (!passwordIsValid) {
        return res.status(401).send(response.getErrorResponse(401));
      }

      //type 1 means user is dashboard user
      var token = jwt.sign({ id: data.id, type: 1 }, config.secret, {
        expiresIn: 7200 // expires in 2 hours
      });

      data.password = "";
      res.status(200).send(
        response.getResponseCustom(200, {
          user: data,
          token: token
        })
      );
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(response.getErrorResponse(500));
    });
};

exports.loginAdminDashboard = (req, res) => {
  Admins.findOne({
    attributes: ["id", "email", "password"],
    where: {
      email: req.body.email
    }
  })
    .then(data => {
      //console.log(bcrypt.hashSync(req.body.password, 10));
      //compare password from database and user input
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        data.password
      );

      if (!passwordIsValid) {
        return res.status(401).send(response.getErrorResponse(401));
      }

      //type 1 means user is dashboard user
      var token = jwt.sign({ id: data.id, type: 1 }, config.secret, {
        expiresIn: 7200 // expires in 2 hours
      });

      data.password = "";
      res.status(200).send(
        response.getResponseCustom(200, {
          user: data,
          token: token
        })
      );
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(response.getErrorResponse(500));
    });
};
