import { Outlet } from "react-router";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Searchbar from "./components/Searchbar";
import { ToastContainer } from "react-toastify";
import ShopContextProvider from "./context/ShopContext";
import AdminNavbar from "./components/Admin/AdminNavbar";
import Sidebar from "./components/Admin/Sidebar";
import { useState } from "react";
import Login from "./components/Admin/Login";
import { useEffect } from "react";
import AuthContext from "./context/AuthContext";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

export const Dashboard = () => {
  const getToken = localStorage.getItem("adminToken");
  const [adminToken, setAdminToken] = useState(getToken ? getToken : "");

  useEffect(() => {
    localStorage.setItem("adminToken", adminToken);
  }, [adminToken]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {adminToken === "" ? (
        <Login setAdminToken={setAdminToken} />
      ) : (
        <>
          <AdminNavbar setAdminToken={setAdminToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <AuthContext.Provider value={adminToken}>
                <Outlet />
              </AuthContext.Provider>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const App = () => {
  return (
    <ShopContextProvider>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />
        <Navbar />
        <Searchbar />
        <Outlet />
        <Footer />
      </div>
    </ShopContextProvider>
  );
};

export default App;
