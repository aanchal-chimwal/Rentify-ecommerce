import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams(); //Extract the id parameter from the url
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarProducts, setsimilarproducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        let response = await fetch(`https://fakestoreapi.com/products/${id}`);
        let data = await response.json();
        setProduct(data);
        let allresponse = await fetch(`https://fakestoreapi.com/products`);
        let alldata = await allresponse.json();
        const filteredProduct = alldata.filter(
          (prod) => prod.category === data.category && prod.id !== data.id
        );
        setsimilarproducts(filteredProduct);
        setfilteredProducts(filteredProduct);
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

  return (
    <>
      <div className="flex justify-evenly items-center mt-8">
        <div>
          <img
            className="h-[500px] hover:scale-110 "
            src={product.image}
            alt={product.title || "Image not available"}
          />
        </div>
        <div className="w-[50%]">
          <h3 className="text-4xl font-bold">{product.title}</h3>
          <p className="text-2xl">{product.description}</p>
          <p className="font-bold text-xl"> Price : ${product.price}</p>
          <p className="font-bold text-xl">
            Rating:{product.rating.rate} ({product.rating.count}reviews)
          </p>

          <button className="mr-8 mt-4 bg-blue-600 p-2 text-xl rounded-md font-bold">
            Buy Now
          </button>
        </div>
        <div className="w-25%"></div>
      </div>
      <div className="bg-gray-300 mt-2">
        <h1 className="text-black text-[50px] text-center font-bold">
          Similar Products
        </h1>
        <div className="bg-gray-300 p-10 grid grid-cols-4 gap-10">
          {similarProducts.map((item) => (
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
                <div className="text-lg">${item.price}</div>
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
          ))}{" "}
        </div>
      </div>
    </>
  );
}

export default Detail;
