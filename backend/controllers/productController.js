import { v2 as cloudinary } from "cloudinary";
import Product from "../models/productModel.js";
import mongoose from "mongoose";

// ----------- add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // ----- get image file from req
    const image1 = req.files.image1 && req.files.image1[0]; // if image1, get image1[0] else return undefined
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    // ------ filter undefined images
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    // ----- upload images to cloudinary and get image url
    let imagesUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    await Product.create(productData);

    res.json({ success: true, message: "Product added" });
  } catch (error) {
    res.json({ success: false, error: error.message });
    console.log(error);
  }
};

// ----------- get list of products
const listProducts = async (_, res) => {
  try {
    const products = await Product.find({});

    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ------------- remove Product
const removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId))
      return res.json({ success: false, message: "No such product." });

    const product = await Product.findOneAndDelete({ _id: productId });

    if (!product)
      return res.json({ success: false, message: "No such product." });

    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ------------ get single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId))
      return res.json({ success: false, message: "No such product." });

    const product = await Product.findById({ _id: productId });

    if (!product)
      return res.json({ success: false, message: "No such product." });

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
