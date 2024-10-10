import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Categories({ wishlist, setWishlist, cart, setCart }) {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch("https://fakestoreapi.com/products");
        let data = await response.json();
        setItems(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchData();
  }, []);
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

  const images = [
    "https://images.pexels.com/photos/12730022/pexels-photo-12730022.jpeg?auto=compress&cs=tinysrgb&w=600", // Lehenga
    "https://images.pexels.com/photos/8784914/pexels-photo-8784914.jpeg?auto=compress&cs=tinysrgb&w=600", // Jewelry
    "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=600", // Grocery
    "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", // Shoes
    "https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=600", // Men's Clothes
    "https://images.pexels.com/photos/618701/pexels-photo-618701.jpeg?auto=compress&cs=tinysrgb&w=600", // Women's Clothes
    "https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg?auto=compress&cs=tinysrgb&w=600", // Child Section
    "https://images.pexels.com/photos/35188/child-childrens-baby-children-s.jpg?auto=compress&cs=tinysrgb&w=600", // Accessories (Jewelry)
    "https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg",
    "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600", // Shoes (Men's)
    // Shoes (Women's)
  ];

  return (
    <div>
      <div className="bg-gray-800 p-2">
        <div className="flex justify-center items-center gap-[120px]">
          <Link
            className="text-gray-200 text-lg font-semibold no-underline hover:text-gray-400 transition-colors duration-300 py-2"
            to="/clothes"
          >
            Clothes
          </Link>
          <Link
            className="text-gray-200 text-lg font-semibold no-underline hover:text-gray-400 transition-colors duration-300 py-2"
            to="/grocery"
          >
            Grocery
          </Link>
          <Link
            className="text-gray-200 text-lg font-semibold no-underline hover:text-gray-400 transition-colors duration-300 py-2"
            to="/accessories"
          >
            Accessories
          </Link>
          <Link
            className="text-gray-200 text-lg font-semibold no-underline hover:text-gray-400 transition-colors duration-300 py-2"
            to="/shoes"
          >
            Shoes
          </Link>
          <Link
            className="text-gray-200 text-lg font-semibold no-underline hover:text-gray-400 transition-colors duration-300 py-2"
            to="/child"
          >
            Child Section
          </Link>
        </div>
      </div>

      {/* Carousel with scrollbar */}
      <div className="w-full h-full overflow-x-scroll bg-slate-400">
        <div className="flex space-x-4">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className="w-[30vw] h-[80vh] rounded-lg bg-gray-200 object-cover hover:scale-90 transition-all  duration-500"
              alt={`Carousel ${index + 1}`}
            />
          ))}
        </div>
      </div>
      {/* categories */}

      <div className="bg-gray-300 p-10 grid grid-cols-4 gap-6">
        {items.map((item) => (
          <Link to={`/detail/${item.id}`} key={item.id} className="block">
            <div className="bg-white p-4 rounded  overflow-hidden h-[400px]">
              <img
                src={item.image}
                alt={item.title}
                className=" h-[230px] w-[300px] mb-4 rounded-lg"
              />
              <div className="text-xl font-bold">
                {item.title.slice(0, 35)}....
              </div>
              <div className="text-lg">
                <i className="fas fa-rupee-sign"> {item.price * 50}</i>
              </div>
              <div className="">
                {" "}
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
        ))}
      </div>
    </div>
  );
}

export default Categories;
