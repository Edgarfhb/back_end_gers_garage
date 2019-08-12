const db = require("../config/db.config.js");
const response = require("../serviceUtil/serviceUtil.js");

const Bookings = db.cct.bookings;
const Staff = db.cct.staff;
const ServiceType = db.cct.serviceType;

exports.getStaffBookings = (req, res) => {
  Staff.findAll({
    attributes: [
      "id",
      "first_name"
    ]
  })
  .then(staff => {
      let staffList = [];
      staff.forEach(element => {
        let auxStaff = {}

        auxStaff.id = element["id"];
        auxStaff.name = element["first_name"];
        auxStaff.bookings = [];

        staffList.push(auxStaff);
      })

      Bookings.findAll({
        attributes: ["id", "date"],
        include: [
          {
          model: Staff,
          attributes: ["id"]
          },
          {
          model: ServiceType,
          attributes: ["type"]
          }
        ],
        order: [["date", "DESC"]]
      })
      .then(bookings => {
        bookings.forEach(element => {
          let auxBooking = {}

          auxBooking.id = element["id"];
          auxBooking.date = element["date"]
          auxBooking.status = element["service_type"]["type"]

          staffList.forEach(staffElement => {
            if(staffElement.id == element["staff"]["id"]){
              staffElement.bookings.push(auxBooking)
            }
          })
        })
        res.status(200).send(
          response.getResponseCustom(200,
            staffList
          )
        );
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(response.getErrorResponse(500));
      });
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(response.getErrorResponse(500));
  });
};

exports.getStaff = (req, res) => {
  Staff.findAll({
  attributes: ["id", ["first_name", "label"]]
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
