import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Detail({ cart, setCart, wishlist, setWishlist }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);

        const allResponse = await fetch(`https://fakestoreapi.com/products`);
        const allData = await allResponse.json();
        const filteredProduct = allData.filter(
          (prod) => prod.category === data.category && prod.id !== data.id
        );
        setSimilarProducts(filteredProduct);
      } catch (error) {
        console.log("Error :", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, [id]);

  if (loading) {
    return <div className="Detail-container">Loading...</div>;
  }

  if (error) {
    return <div className="Detail-container error">Error: {error}</div>;
  }

  const addToWishlist = async (product) => {
    if (!userId) {
      alert("User not logged in. Please log in to add items to your wishlist.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/wish", {
        userId: userId,
        productId: product.id,
        quantity,
      });

      if (response.status === 200) {
        setWishlist((prev) => [...prev, product]); // Update local state for wishlist
        alert(`${product.title} has been added to your wishlist!`);
        navigate("/wish");
      }
    } catch (error) {
      alert(`Could not add ${product.title} to wishlist: ${error.message}`);
    }
  };

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

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start mt-8 space-y-8 lg:space-y-0 lg:space-x-8 px-4">
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            className="h-[300px] md:h-[400px] lg:h-[500px] hover:scale-110 transition-transform"
            src={product.image}
            alt={product.title || "Image not available"}
          />
        </div>
        <div className="w-full lg:w-1/2 space-y-4">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center lg:text-left">
            {product.title}
          </h3>
          <p className="text-md md:text-lg lg:text-xl text-justify">
            {product.description}
          </p>
          <p className="font-bold text-lg lg:text-xl">
            Price: ${product.price}
          </p>
          <p className="font-bold text-lg lg:text-xl">
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </p>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, e.target.value))}
              min="1"
              className="border p-2 rounded-md w-16"
            />
            <button className="bg-blue-600 text-white p-2 rounded-md font-bold text-sm lg:text-xl">
              Buy Now
            </button>
            <button
              onClick={() => addToWishlist(product)}
              className="bg-blue-600 text-white p-2 rounded-md font-bold text-sm lg:text-xl"
            >
              Wishlist
            </button>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 text-white p-2 rounded-md font-bold text-sm lg:text-xl"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-300 mt-8">
        <h1 className="text-black text-xl md:text-3xl lg:text-[50px] text-center font-bold">
          Similar Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          {similarProducts.map((product) => (
            <Link
              to={`/detail/${product.id}`}
              key={product.id}
              className="block"
            >
              <div className="bg-white p-4 rounded-lg shadow-md h-[400px]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-[230px] w-full mb-4 rounded-lg object-contain"
                />
                <div className="text-md md:text-lg font-bold">
                  {product.title.slice(0, 35)}...
                </div>
                <div className="text-md md:text-lg">${product.price}</div>
                <div className="mt-2 flex justify-between">
                  <button
                    onClick={() => addToWishlist(product)}
                    className="bg-slate-800 text-white rounded px-2 py-1 text-xs"
                  >
                    Wishlist
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-slate-800 text-white rounded px-2 py-1 text-xs"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Detail;
