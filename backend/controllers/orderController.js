import logger from "../logger/logger.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

// ------- placing orders using COD
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const order = await Order.create(orderData);

    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed" });
    logger.info(`Order created: ${order._id}`, { userId, orderData });
  } catch (error) {
    logger.error(`Place order error: ${error.message}`);
    res.json({ success: false, message: error.message });
  }
};

// --------- placing orders using stripe method
const placeOrderStripe = async (req, res) => {};

// ---------- placiing orders using Razorpay method
const placeOrderRazorpay = async (req, res) => {};

// ---------- All orders data for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, orders });
  } catch (error) {
    logger.error(`All orders error: ${error.message}`);
    res.json({ success: false, message: error.message });
  }
};

// ----------- user order data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await Order.find({ userId });

    res.json({ success: true, orders });
  } catch (error) {
    logger.error(`User orders error: ${error.message}`);
    res.json({ success: false, message: error.message });
  }
};

// ----------- update order status from admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await Order.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status updated." });
    logger.info(`Order status updated: ${orderId}`, { status });
  } catch (error) {
    logger.error(`Update order status error: ${error.message}`);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
