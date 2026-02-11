import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-20">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        {/* LEFT SECTION */}
        <div>
          <img 
            src={assets?.logo || ""} 
            className="mb-5 w-32" 
            alt="Logo"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <p className="w-full md:w-2/3 text-gray-600">
            We are a modern fashion e-commerce platform offering high-quality
            clothing for men, women, and kids. Our goal is to deliver stylish,
            comfortable, and affordable fashion right to your doorstep.
          </p>
        </div>

        {/* COMPANY SECTION */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* CONTACT SECTION */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 98765 43210</li>
            <li>support@yourstore.com</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM COPYRIGHT */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center text-gray-500">
          © 2026 YourStore.com — All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
