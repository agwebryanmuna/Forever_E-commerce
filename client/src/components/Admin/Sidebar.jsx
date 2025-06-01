import { Link, useLocation } from "react-router";
import { adminAssets } from "../../assets/admin_assets/adminAssets";
import { useEffect } from "react";
import { useState } from "react";

const Sidebar = () => {
  const activePath = useLocation().pathname;
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (activePath === "/admin") {
      setActive("add");
    } else if (activePath === "/admin/list") {
      setActive("list");
    } else if (activePath === "/admin/orders") {
      setActive("orders");
    }
  }, [activePath]);

  return (
    <div className="w-[15%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[15%] text-[15px]">
        <Link
          className={`admin_tab flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
            active === "add" ? "active" : ""
          }`}
          to="/admin"
        >
          <img className="size-5" src={adminAssets.add_icon} alt="add icon" />
          <p className="hidden md:block">Add Items</p>
        </Link>
        <Link
          className={`admin_tab flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
            active === "list" ? "active" : ""
          }`}
          to="/admin/list"
        >
          <img
            className="size-5"
            src={adminAssets.order_icon}
            alt="order icon"
          />
          <p className="hidden md:block">List Items</p>
        </Link>
        <Link
          className={`admin_tab flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
            active === "orders" ? "active" : ""
          }`}
          to="/admin/orders"
        >
          <img
            className="size-5"
            src={adminAssets.order_icon}
            alt="order icon"
          />
          <p className="hidden md:block">Orders</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
