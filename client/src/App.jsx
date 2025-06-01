import { Outlet } from "react-router";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Searchbar from "./components/Searchbar";
import { ToastContainer } from "react-toastify";
import ShopContextProvider from "./context/ShopContext";

export const Dashboard = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      {/* <AdminNavbar/> */}
      <h1>Hello Administrator</h1>
      <Outlet />
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
