//CCT Database
exports.cct_db = {
  database: "GersGarage",
  username: "root",
  password: "root",
  host: "localhost",
  port: "8889",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
