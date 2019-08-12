const db = require("../config/db.config.js");
const response = require("../serviceUtil/serviceUtil.js");

const EngineType = db.cct.engineType;

exports.getEngineTypes = (req, res) => {
    EngineType.findAll({
    attributes: ["id", ["type", "label"]]
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
