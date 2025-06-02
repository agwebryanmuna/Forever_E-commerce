import express from "express";
import {
  addToCart,
  getUserCaart,
  updateCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/Auth.js";

const cartRouter = express.Router();

cartRouter.post("/get", authUser, getUserCaart);

cartRouter.post("/add", authUser, addToCart);

cartRouter.post("/update", authUser, updateCart);

export default cartRouter;
