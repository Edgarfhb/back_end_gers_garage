const db = require("../config/db.config.js");
const response = require("../serviceUtil/serviceUtil.js");

const StatusBooking = db.cct.statusBooking;

exports.getStatusBooking = (req, res) => {
    StatusBooking.findAll({
    attributes: ["id", ["status", "label"]]
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
