import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Shop = ({ wishlist, setWishlist, cart, setCart }) => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get("http://localhost:5001/getCategory");
        let data = await response.data;
        setItems(data);
        setFilteredProducts(data); // Initially, display all products
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const addToWishlist = (item) => {
    if (!wishlist.find((wishItem) => wishItem.id === item.id)) {
      setWishlist((prev) => [...prev, item]);
    } else {
      alert(`${item.title} is already in your wishlist.`);
    }
  };

  const addToCart = (item) => {
    if (!cart.find((cartItem) => cartItem.id === item.id)) {
      setCart((prev) => [...prev, item]);
      navigate("/cart");
    } else {
      alert(`${item.title} is already in your cart.`);
    }
  };

  const handleFilterChange = (category) => {
    setSelectedCategory(category);

    if (category === "") {
      setFilteredProducts(items); // Reset to all products
    } else {
      const filtered = items.filter((product) =>
        product.category.toLowerCase().includes(category.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const handleFilterPriceChange = () => {
    if (!minPrice || !maxPrice) {
      setFilteredProducts(items); // Reset to all products if no price range is selected
    } else {
      const filtered = items.filter(
        (product) =>
          product.price * 50 >= Number(minPrice) &&
          product.price * 50 <= Number(maxPrice)
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="flex">
          <div className="w-[350px] h-auto bg-white rounded-lg shadow-md p-4 m-4">
            <h1 className="text-[30px] font-bold text-blue-600 mb-4">
              Filters
            </h1>

            {/* Category Filter */}
            <div className="mb-4">
              <h1 className="text-2xl font-semibold mt-2">Category</h1>
              <div className="space-y-2">
                {[
                  "men's clothing",
                  "women's clothing",
                  "jewelery",
                  "electronics",
                ].map((category) => (
                  <label
                    key={category}
                    className="flex items-center bg-gray-100 rounded p-2 hover:bg-gray-200 transition duration-300"
                  >
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      onClick={() => handleFilterChange(category)}
                      className="mr-2"
                    />
                    <span className="text-[17px] capitalize">
                      {category.replace(/'/g, "")}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">Price Range</h2>
              <div className="flex space-x-2">
                <input
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="h-10 w-24 border rounded p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="number"
                  placeholder="Min Price"
                />
                <input
                  className="h-10 w-24 border rounded p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="number"
                  placeholder="Max Price"
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleFilterPriceChange}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800 transition duration-300 shadow-md"
            >
              Apply Filters
            </button>
          </div>
        </div>
        <div className="flex bg-gray-300 p-10 grid grid-cols-4 gap-6">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <Link to={`/detail/${item.id}`} key={item.id} className="block">
                <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden h-[400px] transition-transform duration-200 hover:scale-105">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-[230px] w-[300px] mb-4 rounded-lg object-cover"
                  />
                  <div className="text-xl font-bold">
                    {item.name ? item.name : "No Title"}
                  </div>
                  <div className="text-lg">
                    <i className="fas fa-rupee-sign"> {item.price * 50}</i>
                  </div>
                  <div className="">
                    <button
                      onClick={() => addToWishlist(item)}
                      className="mr-3 bg-slate-800 text-white rounded px-1 hover:bg-slate-700 transition duration-200"
                    >
                      Wishlist
                    </button>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-slate-800 text-white rounded px-1 hover:bg-slate-700 transition duration-200"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;
