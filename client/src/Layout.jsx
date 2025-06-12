import { Route, Routes } from "react-router";
import App, { Dashboard } from "./App";
import Add from "./pages/admin/Add";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import List from "./pages/admin/List";
import AdminOrders from "./pages/admin/AdminOrders";
import NotFound from "./pages/NotFound";

const Layout = () => {
  return (
    <Routes>
      <Route path="/admin" element={<Dashboard />}>
        <Route index element={<Add />} />
        <Route path="/admin/list" element={<List />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Route>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Layout;
