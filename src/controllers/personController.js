const { StatusCodes } = require("http-status-codes");
const Person = require("../models/personModel");
const { handleResponse } = require("../utils/responseHandler");
const { handleError } = require("../utils/AppError");

const createPerson = async (req, res) => {
  await Person.insertMany(req.body);

  return handleResponse(
    res,
    StatusCodes.CREATED,
    null,
    "Add the product successfully."
  );
};

const getAllPerson = async (req, res) => {
  const person = await Person.find();
  return res.json(person)
};

module.exports = {
  createPerson,
  getAllPerson,
};
