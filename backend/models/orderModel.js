import mongoose from "mongoose";
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  userId: { type: String, require: true },
  items: { type: Array, require: true },
  amount: { type: Number, require: true },
  address: { type: Object, require: true },
  status: { type: String, require: true, default: "Order Placed" },
  paymentMethod: { type: String, require: true },
  payment: { type: Boolean, require: true, default: false },
  date: { type: Number, require: true },
});

const Order = model.orders || model("order", orderSchema);

export default Order;
