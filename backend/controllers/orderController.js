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

    await Order.create(orderData);

    await User.findByIdAndUpdate(userId, { cardData: {} });

    res.json({ success: true, message: "Order placed" });
  } catch (error) {
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
    res.json({ success: false, message: error.message });
  }
};

// ----------- update order status from admin panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await Order.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status updated." });
  } catch (error) {
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
