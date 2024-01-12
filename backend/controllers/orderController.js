import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../Models/orderModel.js';

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems: orderItems.map((item) => ({
        ...item,
        product: item._id,
        _id: undefined,
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(200).json(createdOrder);
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const orders = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (orders) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found.');
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('Update order to paid');
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('Update order to Delivered');
});

const getAllOrders = asyncHandler(async (req, res) => {
  res.send('Get all orders.');
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
};
