import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ wishlistCount, cartCount }) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch("");
  };
  const handlelogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-gray-900 text-white py-4 sticky top-0 z-20">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 h-[20px]">
        {/* Logo */}
        <div className="text-3xl font-bold text-white tracking-wide hover:text-gray-400 transition-colors duration-200">
          Rentify
        </div>

        <form
          onSubmit={handleSearch}
          className="flex items-center bg-gray-800 rounded-full px-3 py-1 ml-4 w-96 h-8"
        >
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={handleChange}
            className="bg-gray-800 w-full h-8 px-4 text-gray-200 rounded-full outline-none border-none placeholder-gray-400"
          />
          <button
            className="bg-indigo-600 text-white py-1 px-4  h-8 rounded-full hover:bg-indigo-700 transition-all duration-200"
            type="submit"
          >
            Search
          </button>
        </form>

        <div className="flex items-center space-x-8">
          <Link
            className="text-lg text-gray-200 hover:text-indigo-400 transition-colors duration-200 "
            to="/home"
          >
            Home
          </Link>

          <Link
            className="text-lg text-gray-200 hover:text-indigo-400 transition-colors duration-200 "
            to="/shop"
          >
            Shop
          </Link>

          <Link
            className="text-lg text-gray-200 hover:text-indigo-400 transition-colors duration-200 flex items-center"
            to="/wishlist"
          >
            <i className="fa-regular fa-heart mr-1"></i>
            Wishlist
            <sup className="bg-red-500 rounded-xl text-white">
              <button className="w-3 h-4">{wishlistCount}</button>
            </sup>
          </Link>
          <Link
            className="text-lg text-gray-200 hover:text-indigo-400 transition-colors duration-200 flex items-center"
            to="/cart"
          >
            <i className="fa-solid fa-cart-shopping mr-1"></i>
            Cart
            <sup className="bg-red-500 rounded-xl text-white">
              <button className="w-3 h-4">{cartCount}</button>
            </sup>
          </Link>
          <Link
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa-regular fa-user text-2xl "></i>
          </Link>
          <ul className="dropdown-menu bg-white">
            <li>
              <Link className="dropdown-item" to="/home">
                Home
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" to="/login">
                Login
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link
                className="dropdown-item"
                to={`/profile/${localStorage.getItem("id")}`}
              >
                My Profile
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item" to="" onClick={handlelogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
