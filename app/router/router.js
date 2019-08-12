const authJwt = require("./verifyJwtToken");
const verifyReg = require("./verifyRegistration");

module.exports = function(app) {
  const login_controller = require("../controller/login.controller");
  const signup_dashboard_controller = require("../controller/userSignUp.controller");
  const service_type_controller = require("../controller/serviceType.controller");
  const engine_type_controller = require("../controller/engineType.controller");
  const vehicle_make_controller = require("../controller/vehicleMake.controller");
  const vehicle_type_controller = require("../controller/vehicleType.controller");
  const booking_controller = require("../controller/bookings.controller");
  const status_booking_controller = require("../controller/statusBooking.controller");
  const staff_controller = require("../controller/staff.controller");
  const item_controller = require("../controller/items.controller");
  const invoices_controller = require("../controller/invoice.controller");


  //Start API APP
  app.post(
    "/api/adminslogin", //url
    [],
    login_controller.loginAdminDashboard //controller
  );

  app.post(
    "/api/userlogin", //url
    [],
    login_controller.loginUserDashboard //controller
  );

  app.post(
    "/api/signup", //url
    [],
    signup_dashboard_controller.userSignUp //controller
  );

  app.post(
    "/api/add_booking", //url
    [authJwt.verifyToken], //requisitos,
    booking_controller.addBooking //controller
  );

  app.post(
    "/api/setstatusandstaff", //url
    [authJwt.verifyToken], //requisitos,
    booking_controller.setStatusAndStaff //controller
  );

  app.post(
    "/api/create_invoice", //url
    [authJwt.verifyToken], //requisitos,
    invoices_controller.createInvoice //controller
  );

  app.get(
    "/api/get_staff_bookings", //url
    [authJwt.verifyToken], //requisitos
    staff_controller.getStaffBookings //controller
  );

  app.get(
    "/api/getstaff", //url
    [authJwt.verifyToken], //requisitos
    staff_controller.getStaff //controller
  );

  app.get(
    "/api/get_user_bookings", //url
    [authJwt.verifyToken], //requisitos
    booking_controller.getUserBookings //controller
  );

  app.get(
    "/api/getallbookings", //url
    [authJwt.verifyToken], //requisitos
    booking_controller.getAllBookings //controller
  );

  app.get(
    "/api/get_booked_dates", //url
    [authJwt.verifyToken], //requisitos
    booking_controller.getBookedDates //controller
  );

  app.get(
    "/api/get_all_invoices", //url
    [authJwt.verifyToken], //requisitos
    invoices_controller.getAllInvoices //controller
  );

  app.get(
    "/api/service_type", //url
    [authJwt.verifyToken], //requisitos
    service_type_controller.getServiceTypes //controller
  );

  app.get(
    "/api/engine_type", //url
    [authJwt.verifyToken], //requisitos
    engine_type_controller.getEngineTypes //controller
  );

  app.get(
    "/api/vehicle_make", //url
    [authJwt.verifyToken], //requisitos
    vehicle_make_controller.getVehicleMake //controller
  );

  app.get(
    "/api/vehicle_type", //url
    [authJwt.verifyToken], //requisitos
    vehicle_type_controller.getVehicleType //controller
  );

  app.get(
    "/api/status_booking", //url
    [authJwt.verifyToken], //requisitos
    status_booking_controller.getStatusBooking //controller
  );

  app.get(
    "/api/get_items", //url
    [authJwt.verifyToken], //requisitos
    item_controller.getItems //controller
  );
};
