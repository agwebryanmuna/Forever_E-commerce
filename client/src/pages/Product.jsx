import { Suspense, lazy, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ShopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/assets.js";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner.jsx";

const RelatedProducts = lazy(() => import("../components/RelatedProducts.jsx"));

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, token } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    const product = products.find((item) => item._id === productId);

    if (product) {
      setProductData(product);
      setImage(product.image[0]);
      return;
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, i) => (
              <img
                onClick={() => setImage(item)}
                key={i}
                src={item}
                alt=""
                className="w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        {/* product info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">{122}</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, i) => (
                <button
                  onClick={() => setSize(item)}
                  className={`cursor-pointer border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={i}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              token
                ? addToCart(productData._id, size)
                : toast.error("You have to login first.");
            }}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description and review seciton */}
      <div className="mt-20">
        <div className="flex">
          <p className="border px-5 text-sm">Description</p>
          <p className="border px-5 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 text-sm text-gray-500 border p-6">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
            suscipit vitae dolores veritatis porro reprehenderit nisi, optio
            explicabo accusamus doloribus fuga id quos error repudiandae quia
            atque ab magni soluta.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
            assumenda fugiat officiis vel tempore, vitae et nostrum odio quasi
            possimus!
          </p>
        </div>
      </div>
      {/* display related products */}
      <Suspense fallback={<Spinner />}>
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </Suspense>
    </div>
  ) : (
    <div className="">Product not found</div>
  );
};

export default Product;
