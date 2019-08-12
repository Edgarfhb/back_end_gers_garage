const db = require("../config/db.config.js");
const response = require("../serviceUtil/serviceUtil.js");

const VehicleMake = db.cct.vehicleMake;

exports.getVehicleMake = (req, res) => {
    VehicleMake.findAll({
    attributes: ["id", ["make", "label"]]
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
