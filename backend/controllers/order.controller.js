const Order = require("../models/order.schema");
const tryCatchHandler = require("../utils/tryCatchHandler");
const CustomError = require("../utils/customError");
const Book = require("../models/book.schema");


exports.createOrder = tryCatchHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    taxAmount,
    shippingAmount,
    totalAmount,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    taxAmount,
    shippingAmount,
    totalAmount,
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

exports.getOneOrder = tryCatchHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new CustomError("please check order id", 401));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.getLoggedInOrders = tryCatchHandler(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });

  if (!order) {
    return next(new CustomError("please check order id", 401));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Admin only

exports.admingetAllOrders = tryCatchHandler(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.adminUpdateOrder = tryCatchHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new CustomError("Order is already marked for delivered", 401));
  }

  order.orderStatus = req.body.orderStatus;

  order.orderItems.forEach(async (b) => {
    await updateBookStock(b.book, b.quantity);
  });

  await order.save();

  res.status(200).json({
    success: true,
    order,
  });
});

// function used  for update
async function updateBookStock(bookId, quantity) {
  const book = await Book.findById(bookId);

  book.stock = book.stock - quantity;

  await book.save({ validateBeforeSave: false });
}

exports.adminDeleteOrder = tryCatchHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});