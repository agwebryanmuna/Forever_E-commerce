import { createContext, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";
import { backendUrl } from "../App";
import { useEffect } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const deliveryFee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setcartItems] = useState({});
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [isFetching, setIsFetching] = useState(false);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartItemsCopy = { ...cartItems };

    if (cartItemsCopy[itemId]) {
      if (cartItemsCopy[itemId][size]) {
        cartItemsCopy[itemId][size] += 1;
      } else {
        cartItemsCopy[itemId][size] = 1;
      }
    } else {
      cartItemsCopy[itemId] = {};
      cartItemsCopy[itemId][size] = 1;
    }
    setcartItems(cartItemsCopy);

    try {
      await axios.post(
        backendUrl + "/api/cart/add",
        { itemId, size },
        { headers: { token } }
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const product in cartItems) {
      for (const item in cartItems[product]) {
        if (cartItems[product][item] > 0) {
          totalCount += cartItems[product][item];
        }
      }
    }

    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = { ...cartItems };
    cartData[itemId][size] = quantity;
    setcartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalAmount += itemInfo?.price * cartItems[items][item];
        }
      }
    }

    return totalAmount;
  };

  const getProductsData = async () => {
    setIsFetching(true);
    try {
      const res = await axios.get(backendUrl + "/api/product/list");
      if (res.data.success) {
        setProducts(res.data.products);
        setIsFetching(false);
      } else {
        toast.error(res.data.message);
        setIsFetching(false);
      }
    } catch (error) {
      toast.error(error.message);
      setIsFetching(false);
    }
  };

  const getUserCart = async () => {
    if (!token) return null;
    try {
      const res = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setcartItems(res.data.cartData);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    getUserCart();
  }, [token]);

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    token,
    setToken,
    setcartItems,
    isFetching,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
