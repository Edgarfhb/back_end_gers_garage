const env = require("./env.js");

//Conection to CCT Database
const Sequelize_CCT = require("sequelize");
const sequelize_CCT = new Sequelize_CCT(
  env.cct_db.database,
  env.cct_db.username,
  env.cct_db.password,
  {
    host: env.cct_db.host,
    port: env.cct_db.port,
    dialect: env.cct_db.dialect,
    operatorsAliases: false,
    define: {
      timestamps: false,
      freezeTableName: true
    },

    pool: {
      max: env.cct_db.max,
      min: env.cct_db.pool.min,
      acquire: env.cct_db.pool.acquire,
      idle: env.cct_db.pool.idle
    }
  }
);

//CCT Tables and Associations
const cct = {};

cct.database = env.cct_db.database;

cct.Sequelize = Sequelize_CCT;
cct.sequelize = sequelize_CCT;

cct.admin = require("../model_cct/admin.model")(
  sequelize_CCT,
  Sequelize_CCT
);

cct.users = require("../model_cct/users.model")(
  sequelize_CCT,
  Sequelize_CCT
);

cct.engineType = require("../model_cct/engine_type.model")(
  sequelize_CCT,
  Sequelize_CCT
);

cct.cars = require("../model_cct/cars.model")(
  sequelize_CCT,
  Sequelize_CCT
);

cct.bookings = require("../model_cct/bookings.model")(
  sequelize_CCT,
  Sequelize_CCT
);

cct.invoice = require("../model_cct/invoice.model")(
  sequelize_CCT,
  Sequelize_CCT
);

cct.items = require("../model_cct/items.model")(
  sequelize_CCT,
  Sequelize_CCT
);

cct.itemsInvoice = require("../model_cct/items_invoice.model")(
  sequelize_CCT,
  Sequelize_CCT
);

cct.serviceType = require("../model_cct/service_type.model")(
  sequelize_CCT,
  Sequelize_CCT
);

cct.staff = require("../model_cct/staff.model")(
  sequelize_CCT,
  Sequelize_CCT
);

cct.statusBooking = require("../model_cct/status_booking.model")(
  sequelize_CCT,
  Sequelize_CCT
);

cct.statusInvoice = require("../model_cct/status_invoice.model")(
  sequelize_CCT,
  Sequelize_CCT
);

cct.vehicleMake = require("../model_cct/vehicle_make.model")(
  sequelize_CCT,
  Sequelize_CCT
);

cct.vehicleType = require("../model_cct/vehicle_type.model")(
  sequelize_CCT,
  Sequelize_CCT
);

//ASSOCIATIONS

//Users to cars
cct.users.hasMany(cct.cars, { foreignKey: "id" });
cct.cars.belongsTo(cct.users, { foreignKey: "user_id" });

//Invoice to Items Invoice
cct.invoice.hasMany(cct.itemsInvoice, { foreignKey: "invoice_id" });
cct.itemsInvoice.belongsTo(cct.invoice, { foreignKey: "invoice_id" });

//Bookings to cars
cct.cars.hasMany(cct.bookings, { foreignKey: "id" });
cct.bookings.belongsTo(cct.cars, { foreignKey: "car_id" });

//Bookings to staff
cct.staff.hasMany(cct.bookings, { foreignKey: "id" });
cct.bookings.belongsTo(cct.staff, { foreignKey: "staff_id" });

//Booking to service type
cct.bookings.belongsTo(cct.serviceType, { foreignKey: "service_id" });

//Booking to  status booking
cct.bookings.belongsTo(cct.statusBooking, { foreignKey: "status_id" });

//bookings to invoice
cct.bookings.belongsTo(cct.invoice, { foreignKey: "invoice_id" });

//invoice to bookings
cct.invoice.belongsTo(cct.bookings, { foreignKey: "booking_id" });

//Cars to vehicle make
cct.cars.belongsTo(cct.vehicleMake, { foreignKey: "vehicle_make_id" });

//Cars to vehicle type
cct.cars.belongsTo(cct.vehicleType, { foreignKey: "vehicle_type_id" });

//Cars to engine type
cct.cars.belongsTo(cct.engineType, { foreignKey: "engine_id" });

//Invoice to  status status_invoice
cct.invoice.belongsTo(cct.statusInvoice, { foreignKey: "status_id" });

//Items Invoice to items
cct.itemsInvoice.belongsTo(cct.items, { foreignKey: "item_id" });


//END CCT Tables and Associations

module.exports = { cct };
