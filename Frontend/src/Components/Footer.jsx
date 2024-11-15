import React from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const handleclick = () => {
    navigate("/navbar");
  };

  const handleAbout = () => {
    navigate("/about");
  };

  return (
    <div className="bg-gray-800 text-gray-200">
      <footer className="p-5 text-center">
        <h1 className="text-white text-xs font-bold cursor-pointer hover:underline">
          <button onClick={handleclick}>Back to top</button>
        </h1>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <h2 className="text-white text-xs font-semibold">Get to Know Us</h2>
            <p className="text-xs">Careers</p>
            <p className="text-xs">Blog</p>
            <button onClick={handleAbout} className="text-xs">
              About Rentify
            </button>
            <p className="text-xs">Investor Relations</p>
            <p className="text-xs">Rentify Devices</p>
            <p className="text-xs">Rentify Science</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-white text-xs font-semibold">
              Make Money with Us
            </h2>
            <p className="text-xs">Sell products on Rentify</p>
            <p className="text-xs">Sell on Rentify Business</p>
            <p className="text-xs">Sell apps on Rentify</p>
            <p className="text-xs">Become an Affiliate</p>
            <p className="text-xs">Advertise Your Products</p>
            <p className="text-xs">Self-Publish with Us</p>
            <p className="text-xs">Host a Rentify Hub</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-white text-xs font-semibold">
              Rentify Payment Products
            </h2>
            <p className="text-xs">Rentify Business Card</p>
            <p className="text-xs">Shop with Points</p>
            <p className="text-xs">Reload Your Balance</p>
            <p className="text-xs">Amazon Currency Converter</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-white text-xs font-semibold">
              Let Us Help You
            </h2>
            <p className="text-xs">Rentify and COVID-19</p>
            <p className="text-xs">Your Account</p>
            <p className="text-xs">Your Orders</p>
            <p className="text-xs">Shipping Rates & Policies</p>
            <p className="text-xs">Returns & Replacements</p>
            <p className="text-xs">Manage Your Content and Devices</p>
            <p className="text-xs">Help</p>
          </div>
        </div>
      </footer>

      <div className="bg-gray-900 p-4 text-center text-xs">
        <p className="mb-2">
          Conditions of Use | Privacy Notice | Consumer Health Data Privacy
          Disclosure | Your Ads Privacy Choices
        </p>
        <p>© 1996-2024, Rentify.com, Inc. or its affiliates</p>
      </div>
    </div>
  );
}

export default Footer;
