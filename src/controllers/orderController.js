const { StatusCodes } = require("http-status-codes");
const { handleResponse } = require("../utils/responseHandler");
const { handleError } = require("../utils/AppError");

const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const createOrder = async (req, res) => {
  const { name, email, address, products } = req.body;
  if (!name || !email || !address || products.length == 0)
    throw handleError(
      StatusCodes.BAD_REQUEST,
      "Field name, email, address, and products is required."
    );

  let totalPrice = 0;
  for (const item of products) {
    const foundProduct = await Product.findOne({ id: item.id });
    if (!foundProduct)
      throw handleError(
        StatusCodes.BAD_REQUEST,
        `Product ID ${item.id} not found.`
      );
    totalPrice += item.price;
  }
  req.body.totalPrice = totalPrice;
  const newOrder = await new Order(req.body).save();
  return handleResponse(res, StatusCodes.CREATED, newOrder);
};

const getAllOrder = async (req, res) => {
  const foundOrder = await Order.find();
  return handleResponse(
    res,
    StatusCodes.OK,
    foundOrder.length !== 0 ? foundOrder : "Order not found."
  );
};

const getOrder = async (req, res) => {
  const foundOrder = await Order.findOne({ orderID: req.params.id });
  return handleResponse(
    res,
    StatusCodes.OK,
    foundOrder !== null ? foundOrder : `Order ID ${req.params.id} not found.`
  );
};

const deleteOrder = async (req, res) => {
  if (!req.body.orderID)
    throw handleError(StatusCodes.BAD_REQUEST, `Field id is required.`);

  const foundOrder = await Order.findOneAndDelete({
    orderID: req.body.orderID,
  });
  if (!foundOrder)
    throw handleError(
      StatusCodes.BAD_REQUEST,
      `Order ID ${req.body.orderID} not found.`
    );
  return handleResponse(res, StatusCodes.OK, "Delete success.");
};

module.exports = {
  createOrder,
  getAllOrder,
  getOrder,
  deleteOrder,
};
