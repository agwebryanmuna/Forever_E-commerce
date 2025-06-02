import { useContext } from "react";
import { useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Login = () => {
  const { token, setToken, navigate } = useContext(ShopContext);

  const [currentState, setCurrentState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isProcessiing, setIsProcessing] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      if (currentState === "Sign Up") {
        const res = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (res.data.success === true) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        } else {
          toast.error(res.data.message);
        }
        setIsProcessing(false);
      } else {
        const res = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (res.data.success === true) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        } else {
          toast.error(res.data.message);
        }
        setIsProcessing(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-[96] m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Sign Up" && (
        <input
          disabled={isProcessiing}
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
        disabled={isProcessiing}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        disabled={isProcessiing}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign Up")}
          >
            Create account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            Login Here
          </p>
        )}
      </div>
      <button
        disabled={isProcessiing}
        className={`bg-black text-white font-light px-8 py-2 mt-4 ${
          isProcessiing && "cursor-not-allowed"
        }`}
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
