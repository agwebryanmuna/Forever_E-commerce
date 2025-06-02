import { adminAssets } from "../../assets/admin_assets/adminAssets";

const AdminNavbar = ({ setAdminToken }) => {
  return (
    <div className="flex items-center justify-between py-2 px-[4%]">
      <img className="w-[max(10%,80px)]" src={adminAssets.logo} alt="Logo" />
      <button
        onClick={() => setAdminToken("")}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm uppercase"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
