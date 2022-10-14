const { ObjectId } = require("mongodb");
const client = require("../utils/dbConnect");
const employees = client.db("test").collection("employee");

const getEmployees = async (req, res) => {
  try {
    const employeesList = await employees.find().toArray();
    res.status(200).send(employeesList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const employee = await employees.findOne({
      _id: ObjectId(req.params.id),
    });
    res.status(200).send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = await employees.insertOne(req.body);
    res.status(200).send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
};

// update employee by id with patch method
const updateEmployee = async (req, res) => {
  const body = req.body;
  const query = { _id: ObjectId(req.params.id) };
  const options = { upsert: true };
  const updateDoc = {
    $set: body,
  };
  const result = await employees.updateOne(query, updateDoc, options);
  if (result.modifiedCount === 1) {
    res.send({ success: true, message: "Update Employee data successfully" });
  } else {
    res.status(403).send({ success: false, message: "Forbidden request" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await employees.deleteOne({
      _id: ObjectId(req.params.id),
    });
    res.status(200).send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
