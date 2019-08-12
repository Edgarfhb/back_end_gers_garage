const db = require("../config/db.config.js");
const response = require("../serviceUtil/serviceUtil.js");

const Items = db.cct.items;

exports.getItems = (req, res) => {
    Items.findAll({
    attributes: ["id", ["name", "label"], "cost"]
  })
    .then(data => {
      res.status(200).send(
        response.getResponseCustom(200,
          data
        )
      );
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(response.getErrorResponse(500));
    });
};
