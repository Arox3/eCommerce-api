const { StatusCodes } = require("http-status-codes");
const Product = require("../models/productModel");
const { handleResponse } = require("../utils/responseHandler");
const { handleError } = require("../utils/AppError");

const createProduct = async (req, res) => {
  if (!req.body.name)
    throw handleError(StatusCodes.BAD_REQUEST, "Field name is required.");
  const newProduct = await new Product(req.body).save();
  return handleResponse(res, StatusCodes.CREATED, newProduct);
};

const getAllProduct = async (req, res) => {
  const product = await Product.find(req.query);
  return handleResponse(
    res,
    StatusCodes.OK,
    product.length !== 0 ? product : "Product not found."
  );
};

const getProduct = async (req, res) => {
  const product = await Product.findOne({ id: req.params.id });
  return handleResponse(
    res,
    StatusCodes.OK,
    product !== null ? product : `Product ID ${req.params.id} not found.`
  );
};

const updateProduct = async (req, res) => {
  if (!req.body.id)
    throw handleError(StatusCodes.BAD_REQUEST, "Field id is required.");
  const foundProduct = await Product.findOne({ id: req.body.id });
  if (!foundProduct)
    throw handleError(
      StatusCodes.BAD_REQUEST,
      `Product ID ${req.body.id} not found.`
    );

  await Product.updateOne({ id: req.body.id }, { $set: req.body });
  const updatedProduct = await Product.findOne({ id: req.body.id });
  return handleResponse(res, StatusCodes.OK, updatedProduct);
};

const deleteProduct = async (req, res) => {
  if (!req.body.id)
    throw handleError(StatusCodes.BAD_REQUEST, `Field id is required.`);

  const foundProduct = await Product.findOneAndDelete({ id: req.body.id });
  if (!foundProduct)
    throw handleError(
      StatusCodes.BAD_REQUEST,
      `Product ID ${req.body.id} not found.`
    );
  return handleResponse(res, StatusCodes.OK, "Delete success.");
};

module.exports = {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
