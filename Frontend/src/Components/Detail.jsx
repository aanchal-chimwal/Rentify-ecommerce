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
      <div className="flex justify-evenly items-center mt-8">
        <div>
          <img
            className="h-[500px] hover:scale-110"
            src={product.image}
            alt={product.title || "Image not available"}
          />
        </div>
        <div className="w-[50%]">
          <h3 className="text-4xl font-bold">{product.title}</h3>
          <p className="text-2xl">{product.description}</p>
          <p className="font-bold text-xl">Price: ${product.price}</p>
          <p className="font-bold text-xl">
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </p>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, e.target.value))}
            min="1"
            className="border p-2 rounded-md"
          />
          <button className="mr-8 mt-4 bg-blue-600 p-2 text-xl rounded-md font-bold">
            Buy Now
          </button>
          <button
            onClick={() => addToWishlist(product)}
            className="mr-8 mt-4 bg-blue-600 p-2 text-xl rounded-md font-bold"
          >
            Wishlist
          </button>
          <button
            onClick={() => addToCart(product)}
            className="mr-8 mt-4 bg-blue-600 p-2 text-xl rounded-md font-bold"
          >
            Add to cart
          </button>
        </div>
      </div>
      <div className="bg-gray-300 mt-2">
        <h1 className="text-black text-[50px] text-center font-bold">
          Similar Products
        </h1>
        <div className="bg-gray-300 p-10 grid grid-cols-4 gap-10">
          {similarProducts.map((product) => (
            <Link
              to={`/detail/${product.id}`}
              key={product.id}
              className="block"
            >
              <div className="bg-white p-4 rounded overflow-hidden h-[400px]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-[230px] w-[300px] mb-4 rounded-lg"
                />
                <div className="text-xl font-bold">
                  {product.title.slice(0, 35)}....
                </div>
                <div className="text-lg">${product.price}</div>
                <div>
                  <button
                    onClick={() => addToWishlist(product)}
                    className="mr-3 bg-slate-800 text-white rounded px-1"
                  >
                    Wishlist
                  </button>
                  <button
                    onClick={() => addToCart(product)}
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
    </>
  );
}

export default Detail;
