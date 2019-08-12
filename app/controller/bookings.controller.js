const db = require("../config/db.config.js");
const config = require("../config/config.js");
const response = require("../serviceUtil/serviceUtil.js");

const bcrypt = require("bcryptjs");

const Bookings = db.cct.bookings;
const Cars = db.cct.cars;
const Staff = db.cct.staff;
const Users = db.cct.users;
const Invoice = db.cct.invoice;
const InvoiceStatus = db.cct.statusInvoice;
const VehicleMake = db.cct.vehicleMake;
const VehicleType = db.cct.vehicleType;
const EngineType = db.cct.engineType;
const ServiceType = db.cct.serviceType;
const StatusBooking = db.cct.statusBooking;


exports.addBooking = (req, res) => {
  Cars.create({
    user_id: req.user_id,
    vehicle_type_id: req.body.vehicle_type_id,
    vehicle_make_id: req.body.vehicle_make_id,
    engine_id: req.body.engine_id,
    vehicle_licence: req.body.vehicle_licence,
  })
  .then(query1 => {
    Cars.findOne({
      attributes: ["id"],
      where: {
        user_id: req.user_id
      },
      order: [['id', 'DESC']]
    })
    .then(query2 => {
      Bookings.create({
          date: req.body.date,
          car_id: query2.id,
          service_id: req.body.service_id,
          status_id: 1,
          comments: req.body.comments,
        })
        .then(query3 => {
          res.status(201).send(
            response.getResponse(201)
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
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(response.getErrorResponse(500));
  });
};

exports.setStatusAndStaff = (req, res) => {
  Bookings.update({
    status_id: req.body.status_id,
    staff_id: req.body.staff_id,
  },
  {
    where: {
      id: req.body.booking_id
    }
  }
)
  .then(data => {
    res.status(200).send(
      response.getResponse(200)
    );
  })
  .catch(err => {
    console.log(err);
    res.status(500).send(response.getErrorResponse(500));
  });
};

exports.getUserBookings = (req, res) => {
    Bookings.findAll({
    attributes: ["id", "date", "comments"],
    order: [['id', 'ASC']],
    include: [
      {
        model: Invoice,
        attributes: ["status_id"],
        include: [
          {
            model: InvoiceStatus,
            attributes: ["status"]
          }
        ]
      },
      {
      model: ServiceType,
      attributes: ["type"]
      },
      {
      model: StatusBooking,
      attributes: ["status"]
      },
      {
      model: Cars,
      attributes: ["id", "vehicle_licence"],
      include: [
        {
          model: VehicleType,
          attributes: ["type"]
        },
        {
          model: VehicleMake,
          attributes: ["make"]
        },
        {
          model: EngineType,
          attributes: ["type"]
        },
        {
          model: Users,
          attributes: [
            "first_name",
            "last_name",
            "phone_number"
          ]
        }
      ],
      where: {
        user_id: req.user_id
      }
    }]
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

exports.getAllBookings = (req, res) => {
    Bookings.findAll({
    attributes: ["id", "date", "comments"],
    order: [['id', 'ASC']],
    include: [
      {
        model: Invoice,
        attributes: ["status_id"],
        include: [
          {
            model: InvoiceStatus,
            attributes: ["status"]
          }
        ]
      },
      {
      model: Staff,
      attributes: ["first_name"]
      },
      {
      model: ServiceType,
      attributes: [
        "type",
        "cost"
        ]
      },
      {
      model: StatusBooking,
      attributes: ["status"]
      },
      {
      model: Cars,
      attributes: ["id", "vehicle_licence"],
      include: [
        {
          model: VehicleType,
          attributes: ["type"]
        },
        {
          model: VehicleMake,
          attributes: ["make"]
        },
        {
          model: EngineType,
          attributes: ["type"]
        },
        {
          model: Users,
          attributes: [
            "first_name",
            "last_name",
            "phone_number"
          ]
        },
      ],
    }]
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

exports.getBookedDates = (req, res) => {
    Bookings.findAll({
    attributes: [
      "date",
      [db.cct.sequelize.fn(
        'sum',
        db.cct.sequelize.col('service_type.staff_cost')),
        'total_staff_cost'
      ]
    ],
    include: [
      {
      model: ServiceType,
      attributes: []
      }
    ],
    group: ['booking.date']
  })
    .then(data => {
      let booked_dates = []

      data.forEach(element => {
        if(parseInt(element["dataValues"]["total_staff_cost"])>15){
          booked_dates.push(element["date"])
        }
      })

      res.status(200).send(
        response.getResponseCustom(200,
          booked_dates
        )
      );
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(response.getErrorResponse(500));
    });
};
