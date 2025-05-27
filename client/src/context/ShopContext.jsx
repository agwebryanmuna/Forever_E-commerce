import { createContext } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const deliveryFee = 10;

  const value = { products, currency, deliveryFee };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
