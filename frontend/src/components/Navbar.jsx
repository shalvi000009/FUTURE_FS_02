import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { ShopContext } from "../context/ShopContext.jsx";

const safeAssets = assets || {};

const NAV_LINKS = [
  { path: "/", label: "HOME" },
  { path: "/collection", label: "COLLECTION" },
  { path: "/about", label: "ABOUT" },
  { path: "/contact", label: "CONTACT" }
];

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch , getCartCount} = useContext(ShopContext);

  const fallbackImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E";

  return (
    <div className="relative flex items-center justify-between py-5 font-medium">

      {/* Logo */}
      <Link to="/">
        <img
          src={safeAssets.logo || fallbackImage}
          alt="logo"
          className="w-36"
        />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className="flex flex-col items-center gap-1"
          >
            <p>{link.label}</p>
            <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <img
          onClick={() => setShowSearch(true)}
          src={safeAssets.search_icon || fallbackImage}
          className="w-5 cursor-pointer"
          alt="search"
        />

        {/* Profile */}
        <div className="group relative">
          <Link to="/login">
            <img
              src={safeAssets.profile_icon || fallbackImage}
              className="w-5 cursor-pointer"
              alt="profile"
            />
          </Link>

          <div className="hidden group-hover:block absolute right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-600 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>


        {/* Cart */}
        <Link to="/cart" className="relative">
          <img
            src={safeAssets.cart_icon || fallbackImage}
            className="w-5 min-w-5"
            alt="cart"
          />
          <p className="absolute -right-1 -bottom-1 w-4 text-center bg-black text-white rounded-full text-[8px]">{getCartCount()}</p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={safeAssets.menu_icon || fallbackImage}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu"
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-white z-50 transition-transform duration-300 ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col text-gray-600">

          {/* Back */}
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-4 cursor-pointer border-b"
          >
            <img
              src={safeAssets.dropdown_icon || fallbackImage}
              className="h-4 rotate-180"
              alt="back"
            />
            <p>Back</p>
          </div>

          {/* Mobile Links */}
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setVisible(false)}
              className="py-4 pl-6 border-b"
            >
              {link.label}
            </NavLink>
          ))}

        </div>
      </div>

    </div>
  );
};

export default Navbar;
