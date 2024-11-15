// import React from "react";
// import { Link } from "react-router-dom";

// function Wishlist({ wishlist, setWishlist }) {
//   const removeItems = (id) => {
//     setWishlist((prev) => prev.filter((item) => item.id !== id));
//   };
//   return (
//     <div className="p-10">
//       <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
//       {wishlist.length === 0 ? (
//         <p>No items in your wishlist.</p>
//       ) : (
//         <div className="grid grid-cols-4 gap-6">
//           {wishlist.map((item) => (
//             <Link to={`/detail/${item.id}`} key={item.id} className="block">
//               <div className="bg-white p-4 rounded overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="h-[230px] w-[300px] mb-4 rounded-lg"
//                 />
//                 <div className="text-xl font-bold">
//                   {item.title.slice(0, 35)}....
//                 </div>
//                 <div className="text-lg">
//                   ${item.price}{" "}
//                   <button
//                     onClick={() => removeItems(item.id)}
//                     className="bg-blue-600 text-white ml-3 px-2 rounded-md"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }`

// export default Wishlist;
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported

function Wishlist({ wishlist, setWishlist }) {
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/wish/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Log the response to check the structure

        setWishlist(response.data.wishlistItems || response.data); // Update state with fetched items
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    };

    if (userId && token) {
      fetchWishlistItems(); // Fetch wishlist items if the user is logged in
    }
  }, [userId, token, setWishlist]);

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
                  alt={item.title || "Image not available"}
                  className="h-[230px] w-[300px] mb-4 rounded-lg"
                />
                <div className="text-xl font-bold">
                  {item.title ? item.title.slice(0, 35) : "Untitled"}....
                </div>
                <div className="text-lg">
                  ${item.price || "N/A"}{" "}
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
