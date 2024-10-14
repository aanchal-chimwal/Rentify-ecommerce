// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// function Categories({ wishlist, setWishlist, cart, setCart }) {
//   const SliderSettings = {
//     // dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 2,
//     autoplay: true,
//     autoplaySpeed: 1000,
//   };
//   const [items, setItems] = useState([]);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let response = await fetch("https://fakestoreapi.com/products");
//         let data = await response.json();
//         setItems(data);
//       } catch (error) {
//         console.log("Error:", error);
//       }
//     };
//     fetchData();
//   }, []);
//   const addToWishlist = (item) => {
//     if (!wishlist.find((wishItem) => wishItem.id === item.id)) {
//       setWishlist((prev) => [...prev, item]);
//       // alert(`${item.title} added to wishlist!`);
//     } else {
//       alert(`${item.title} is already in your wishlist.`);
//     }
//   };

//   const addToCart = (item) => {
//     // Prevent adding duplicate items to the cart
//     if (!cart.find((cartItem) => cartItem.id === item.id)) {
//       setCart((prev) => [...prev, item]);
//       navigate("/cart");
//     } else {
//       alert(`${item.title} is already in your cart.`);
//     }
//   };

//   const images = [
//     "https://images.pexels.com/photos/12730022/pexels-photo-12730022.jpeg?auto=compress&cs=tinysrgb&w=600", // Lehenga
//     "https://images.pexels.com/photos/8784914/pexels-photo-8784914.jpeg?auto=compress&cs=tinysrgb&w=600", // Jewelry
//     "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=600", // Grocery
//     "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", // Shoes
//     "https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=600", // Men's Clothes
//     "https://images.pexels.com/photos/618701/pexels-photo-618701.jpeg?auto=compress&cs=tinysrgb&w=600", // Women's Clothes
//     "https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg?auto=compress&cs=tinysrgb&w=600", // Child Section
//     "https://images.pexels.com/photos/35188/child-childrens-baby-children-s.jpg?auto=compress&cs=tinysrgb&w=600", // Accessories (Jewelry)
//     "https://images.pexels.com/photos/298864/pexels-photo-298864.jpeg",
//     "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600", // Shoes (Men's)
//   ];

//   return (
//     <div>
//       <div className="bg-gray-800 p-2">
//         <div className="flex justify-center items-center gap-[120px]"></div>
//       </div>

//       {/* Carousel with scrollbar */}
//       <div className="w-full h-full overflow-x-hidden bg-slate-400">
//         <Slider {...SliderSettings}>
//           {images.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               className="w-[30vw] h-[80vh] rounded-lg bg-gray-200 object-cover hover:scale-90 transition-all  duration-500"
//               alt={`Carousel ${index + 1}`}
//             />
//           ))}
//         </Slider>
//       </div>

//       <div className="bg-gray-300 p-10 grid grid-cols-4 gap-6">
//         {items.map((item) => (
//           <Link to={`/detail/${item.id}`} key={item.id} className="block">
//             <div className="bg-white p-4 rounded  overflow-hidden h-[400px]">
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className=" h-[230px] w-[300px] mb-4 rounded-lg"
//               />
//               <div className="text-xl font-bold">
//                 {item.title.slice(0, 35)}....
//               </div>
//               <div className="text-lg">
//                 <i className="fas fa-rupee-sign"> {item.price * 50}</i>
//               </div>
//               <div className="">
//                 {" "}
//                 <button
//                   onClick={() => addToWishlist(item)}
//                   className="mr-3 bg-slate-800 text-white rounded px-1 "
//                 >
//                   Wishlist
//                 </button>
//                 <button
//                   onClick={() => addToCart(item)}
//                   className=" bg-slate-800 text-white rounded px-1 "
//                 >
//                   Add to cart
//                 </button>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Categories;
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
  const navigate = useNavigate();

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
  const addToWishlist = (item) => {
    if (!wishlist.find((wishItem) => wishItem.id === item.id)) {
      setWishlist((prev) => [...prev, item]);
    } else {
      alert(`${item.title} is already in your wishlist.`);
    }
  };

  // Handle adding items to cart
  const addToCart = (item) => {
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
  ];

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Subcategories Section */}
      <div className="bg-gray-800 ">
        <div className="subcategories p-3 rounded-md shadow-md text-white text-2xl ">
          <ul className="flex space-x-6 justify-center">
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
      <div className="bg-gray-300 p-10 grid grid-cols-4 gap-6">
        {items.map((item) => (
          <Link to={`/detail/${item.id}`} key={item.id} className="block">
            <div className="bg-white p-4 rounded overflow-hidden h-[400px]">
              <img
                src={item.image}
                alt={item.title}
                className=" h-[230px] w-[300px] mb-4 rounded-lg"
              />
              <div className="text-xl font-bold">
                {item.title.slice(0, 35)}...
              </div>
              <div className="text-lg">
                <i className="fas fa-rupee-sign"> {item.price * 50}</i>
              </div>
              <div>
                <button
                  onClick={() => addToWishlist(item)}
                  className="mr-3 bg-slate-800 text-white rounded px-1"
                >
                  Wishlist
                </button>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-slate-800 text-white rounded px-1"
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
