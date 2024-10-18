import React, { useState } from "react";
import { Axios } from "axios";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Wishlist from "./Components/Wishlist";
import Cart from "./Components/Cart";
import Categories from "./Components/Categories";
import Footer from "./Components/Footer";
import Detail from "./Components/Detail";
import MyProfile from "./Components/MyProfile";
import Shop from "./Components/Shop";
import AboutUs from "./Components/AbooutUs";

function App() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem("id");
  console.log("User ID:", userId);
  console.log("Wishlist:", wishlist);
  console.log("Cart:", cart);
  return (
    <div>
      <BrowserRouter>
        <Navbar
          wishlistCount={wishlist?.length || 0}
          cartCount={cart?.length || 0}
        />

        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/home"
            element={
              <>
                <Categories
                  wishlist={wishlist}
                  setWishlist={setWishlist}
                  cart={cart}
                  setCart={setCart}
                />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/shop"
            element={
              <Shop
                wishlist={wishlist}
                setWishlist={setWishlist}
                cart={cart}
                setCart={setCart}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/wishlist"
            element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} />}
          />
          <Route
            path="/cart"
            element={<Cart cart={cart} setCart={setCart} />}
          />

          <Route
            path="/detail/:id"
            element={
              <Detail
                cart={cart}
                setCart={setCart}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            }
          />
          <Route path="/profile/:userId" element={<MyProfile />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
