import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Categories({ wishlist, setWishlist, cart, setCart }) {
  const SliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Added quantity state
  const navigate = useNavigate();
  const userId = localStorage.getItem("id"); // Retrieve userId from localStorage
  const [page, setpage] = useState(1);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5001/getCategory");
        setCategories(response.data); // Assuming the response contains an array of categories
      } catch (err) {
        setError("Error fetching categories");
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products from the external API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchData();
  }, []);

  // Handle adding items to wishlist
  const addToWishlist = async (product) => {
    try {
      const response = await axios.post("http://localhost:5001/wish", {
        userId: userId,
        productId: product.id,
        quantity,
      });
      if (response.status === 200) {
        setWishlist((prev) => [...prev, product]); // Update the wishlist correctly
        // alert(`${product.title} has been added to your wishlist.`);
      }
    } catch (error) {
      alert(`Could not add ${product.title} to wishlist: ${error.message}`);
    }
  };

  // Handle adding items to cart
  const addToCart = async (product) => {
    try {
      const response = await axios.post("http://localhost:5001/cart", {
        userId: userId,
        productId: product.id,
        quantity,
      });
      if (response.status === 200) {
        setCart((prev) => [...prev, { ...product, quantity }]);
        navigate("/cart");
      }
    } catch (error) {
      alert(`Could not add ${product.title} to cart: ${error.message}`);
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
  ];

  if (error) {
    return <div>{error}</div>;
  }
  const itemPerPage = 4;
  const lastIndex = page * itemPerPage;
  const firstIndex = lastIndex - itemPerPage;
  const newProduct = items.slice(firstIndex, lastIndex);
  const totalPage = Math.ceil(items.length / itemPerPage);

  const handlePrevious = () => {
    if (page > 1) {
      setpage(page - 1);
    }
  };
  const handleNext = () => {
    if (page < totalPage) {
      setpage(page + 1);
    }
  };
  return (
    <div>
      {/* Subcategories Section */}
      <div className="bg-gray-800 ">
        <div className="subcategories p-3 rounded-md shadow-md text-white text-xs md:text-2xl ">
          <ul className="flex md:space-x-6 space-x-2 justify-center">
            {categories.length > 0 ? (
              categories.map((category) => (
                <li
                  key={category.id}
                  className="hover:bg-gray-200 px-4 py-2 rounded cursor-pointer"
                >
                  <Link to={`/category/${category.id}`}>{category.name}</Link>
                </li>
              ))
            ) : (
              <li>Loading categories...</li>
            )}
          </ul>
        </div>
      </div>
      {/* Carousel Section */}
      <div className="w-full h-full overflow-x-hidden bg-slate-400 ">
        <Slider {...SliderSettings}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              className="w-[30vw] h-[80vh] rounded-lg bg-gray-200 object-cover hover:scale-90 transition-all duration-500"
              alt={`Carousel ${index + 1}`}
            />
          ))}
        </Slider>
      </div>
      {/* Product Grid Section */}
      <div className="bg-gray-300 p-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {newProduct.map((item) => (
          <Link to={`/detail/${item.id}`} key={item.id} className="block">
            <div className="bg-white p-4 rounded overflow-hidden h:[300px] md:h-[400px]">
              <img
                src={item.image}
                alt={item.title}
                className="  h-[150px] md:h-[230px] w-[300px] mb-4 rounded-lg"
              />
              <div className=" text-xs md:text-xl md:font-bold ">
                {item.title.slice(0, 35)}...
              </div>
              <div>
                <i className="fas fa-rupee-sign  text-xs md:text-lg">
                  {" "}
                  {item.price * 50}
                </i>
              </div>
              <div>
                <button
                  onClick={() => addToWishlist(item)}
                  className="mr-3 bg-slate-800 text-white rounded px-1  text-xs md:text-lg"
                >
                  Wishlist
                </button>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-slate-800 text-white rounded px-1 text-xs md:text-lg"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>{" "}
      <div className="flex justify-between ">
        <button
          onClick={handlePrevious}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-800 transition duration-200"
        >
          Previous
        </button>
        <button
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:bg-blue-800 transition duration-200"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Categories;
