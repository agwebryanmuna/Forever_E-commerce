import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

// ---- add product with multer middleware
productRouter.post(
  "/add-product",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

// ---- get all products
productRouter.get("/list", listProducts);

// ---- remove product
productRouter.delete("/:productId", removeProduct);

// ---- get a product
productRouter.get("/:productId", singleProduct);

export default productRouter;
