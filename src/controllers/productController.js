const { StatusCodes } = require("http-status-codes");
const Product = require("../models/productModel");
const { handleResponse } = require("../utils/responseHandler");
const { handleError } = require("../utils/AppError");

const createProduct = async (req, res) => {
  if (!req.body.product_name)
    throw handleError(
      StatusCodes.BAD_REQUEST,
      "Field product_name is required."
    );
  const newProduct = await new Product(req.body).save();
  return handleResponse(
    res,
    StatusCodes.CREATED,
    newProduct,
    "Add the product successfully."
  );
};

const getAllProduct = async (req, res) => {
  const product = await Product.find();
  return handleResponse(res, StatusCodes.OK, product);
};

const getProduct = async (req, res) => {
  const product = await Product.findOne({ id: req.params.id });
  return handleResponse(
    res,
    StatusCodes.OK,
    product !== null ? product : null,
    product !== null ? null : `Product ID ${req.params.id} not found.`
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

  await Product.updateOne(
    { id: req.body.id },
    {
      $set: {
        productName: req.body?.productName ?? foundProduct.productName,
        description: req.body?.description ?? foundProduct.description,
        price: req.body?.price ?? foundProduct.price,
        productImage: req.body?.productImage ?? foundProduct.productImage,
      },
    }
  );
  const updatedProduct = await Product.findOne({ id: req.body.id });
  return handleResponse(
    res,
    StatusCodes.OK,
    updatedProduct,
    "The update was successful."
  );
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
