import { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    navigate,
    token,
    cartItems,
    setcartItems,
    getCartAmount,
    deliveryFee,
    products,
  } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");

  const [formatData, setFormatData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormatData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formatData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      };

      switch (method) {
        // api calls for cash on delivery order
        case "cod":
          const res = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (res.data.success) {
            setcartItems({});
            navigate("/orders");
          } else {
            toast.error(res.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error(res.data.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formatData.firstName}
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formatData.lastName}
            placeholder="Last name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formatData.email}
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formatData.street}
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formatData.city}
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formatData.state}
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formatData.zipcode}
            placeholder="Zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formatData.country}
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formatData.phone}
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
        />
      </div>

      {/* right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.razorpay_logo} className="h-5 mx-4" alt="" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
