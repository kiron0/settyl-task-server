const mongodb = require("mongodb");
const employeesController = require("../controllers/employeesController");

module.exports = mongodb.model("employees", employeesController);