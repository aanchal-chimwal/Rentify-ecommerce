import React from "react";
import { Link } from "react-router-dom";

function Wishlist({ wishlist, setWishlist }) {
  const removeItems = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No items in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <Link to={`/detail/${item.id}`} key={item.id} className="block">
              <div className="bg-white p-4 rounded overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-[230px] w-[300px] mb-4 rounded-lg"
                />
                <div className="text-xl font-bold">
                  {item.title.slice(0, 35)}....
                </div>
                <div className="text-lg">
                  ${item.price}{" "}
                  <button
                    onClick={() => removeItems(item.id)}
                    className="bg-blue-600 text-white ml-3 px-2 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
