const db = require("../config/db.config.js");
const response = require("../serviceUtil/serviceUtil.js");

const Bookings = db.cct.bookings;
const Cars = db.cct.cars;
const Staff = db.cct.staff;
const Users = db.cct.users;
const Invoice = db.cct.invoice;
const InvoiceItems = db.cct.itemsInvoice;
const Items = db.cct.items;
const InvoiceStatus = db.cct.statusInvoice;
const VehicleMake = db.cct.vehicleMake;
const VehicleType = db.cct.vehicleType;
const EngineType = db.cct.engineType;
const ServiceType = db.cct.serviceType;
const StatusBooking = db.cct.statusBooking;

exports.getAllInvoices = (req, res) => {
    Invoice.findAll({
    attributes: [
      "id",
      "booking_id",
      "status_id",
      "total"
    ],
    order: [['id', 'ASC']],
    include: [
      {
        model: Bookings,
        attributes: [
          "id",
          "date"
        ],
        include: [
          {
            model: Cars,
            include: [
              {
                model: Users,
                attributes: [
                  "id",
                  "first_name",
                  "last_name",
                  "phone_number"
                ]
              },
              {
                model: VehicleMake,
                attributes: ["make"]
              },
              {
                model: VehicleType,
                attributes: ["type"]
              }
            ]
          },
          {
            model: ServiceType,
            attributes: [
              "type",
              "cost"
            ]
          }
        ]
      },
      {
        model: InvoiceStatus,
        attributes: ["status"]
      },
      {
        model: InvoiceItems,
        include: [
          {
            model: Items,
            attributes: [
              "name",
              "cost"
            ]
          }
        ]
      }
    ]
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


exports.createInvoice = (req, res) => {
  console.log(req.body.item_id)
  Invoice.create({
    booking_id: req.body.booking_id,
    total: req.body.total_cost,
  })
  .then(query1 => {
    Invoice.findOne({
      attributes: ["id"],
      where: {
        booking_id: req.body.booking_id
      },
      order: [['id', 'DESC']]
    })
    .then(query2 => {
      req.body.item_id.forEach(element =>{
        InvoiceItems.create({
            item_id: element,
            invoice_id: query2.id,
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
