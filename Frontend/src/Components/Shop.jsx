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
        // let response = await fetch("https://fakestoreapi.com/product");
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
      // alert(`${item.title} added to wishlist!`);
    } else {
      alert(`${item.title} is already in your wishlist.`);
    }
  };

  const addToCart = (item) => {
    // Prevent adding duplicate items to the cart
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
          <div className="w-[350px] h-[420px] bg-slate-200 rounded-md">
            <h1 className="text-[30px] font-bold m-2 p-2 text-blue-600">
              Filters
            </h1>

            {/* Category Filter */}
            <div className="ml-3">
              <h1 className="text-2xl  mt-2">Category</h1>
              <label className="text-[17px] ml-2 mt-2">
                Men
                <input
                  type="radio"
                  name="category"
                  value="men's clothing"
                  onClick={() => handleFilterChange("men's clothing")}
                />
              </label>
              <br />
              <label className="text-[17px] ml-2 ">
                Women
                <input
                  type="radio"
                  name="category"
                  value="women's clothing"
                  onClick={() => handleFilterChange("women's clothing")}
                />
              </label>{" "}
              <br />
              <label className="text-[17px] ml-2 ">
                Jwellery
                <input
                  type="radio"
                  name="category"
                  value="jewelery"
                  onClick={() => handleFilterChange("jewelery")}
                />
              </label>{" "}
              <br />
              <label className="text-[17px] ml-2">
                Electronics
                <input
                  type="radio"
                  name="category"
                  value="electronics"
                  onClick={() => handleFilterChange("electronics")}
                />
              </label>{" "}
              <br />
            </div>

            {/* Price Range Filter */}
            <div className="ml-3">
              <h2 className="text-2xl">Price Range</h2>
              <label className="text-[17px] ml-2 mt-2">
                Min Price
                <input
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="h-5 w-20 rounded-sm text-[15px] p-[1px] "
                  type="number"
                  placeholder="Min Price"
                />
              </label>
              <br />
              <label className="text-[17px] ml-2">
                Max Price
                <input
                  className="h-5 w-20 rounded-sm text-[15px] p-[1px]"
                  type="number"
                  placeholder="Max Price"
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </label>
            </div>

            {/* Apply Filter Button */}
            <button
              onClick={handleFilterPriceChange}
              className="text-center bg-blue-700 text-black ml-16 p-1 rounded-md mt-4"
            >
              Apply Filters
            </button>
          </div>
        </div>
        <div className="flex bg-gray-300 p-10 grid grid-cols-4 gap-6">
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <Link to={`/detail/${item.id}`} key={item.id} className="block">
                <div className="bg-white p-4 rounded  overflow-hidden h-[400px]">
                  <img
                    src={item.img}
                    alt={item.name}
                    className=" h-[230px] w-[300px] mb-4 rounded-lg"
                  />
                  <div className="text-xl font-bold">
                    {item.name ? item.name : "No Title"}
                  </div>
                  <div className="text-lg">
                    {" "}
                    <i className="fas fa-rupee-sign"> {item.price * 50}</i>
                  </div>
                  <div className="">
                    <button
                      onClick={() => addToWishlist(item)}
                      className="mr-3 bg-slate-800 text-white rounded px-1 "
                    >
                      Wishlist
                    </button>
                    <button
                      onClick={() => addToCart(item)}
                      className=" bg-slate-800 text-white rounded px-1 "
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
