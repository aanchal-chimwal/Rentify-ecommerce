// import React from "react";
// import { Link } from "react-router-dom";

// function Cart({ cart, setCart }) {
//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         // Assuming token-based auth
//         const response = await axios.get(
//           `http://localhost:5001/cart/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         // Set the cart state with the items fetched from the backend
//         setCart(response.data);
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//       }
//     };

//     fetchCartItems();
//   }, [userId, setCart]);

//   const removeItems = (id) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   return (
//     <div className="p-10">
//       <h2 className="text-2xl font-bold mb-4">My Cart</h2>
//       {cart.length === 0 ? (
//         <p>No items in your cart.</p>
//       ) : (
//         <div className="grid grid-cols-4 gap-6">
//           {cart.map((item) => (
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
// }

// export default Cart;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Cart({ cart, setCart }) {
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5001/cart/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", response.data); // Log the response
        console.log("API Response:", response.data);
        setCart(response.data.cartItems || response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) {
      fetchCartItems();
    } else {
      console.warn("User ID or token is not available.");
    }
  }, [userId, token, setCart]);

  const removeItems = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/cart/${userId}/item/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>
      {cart.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {cart.map((item) => (
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

export default Cart;
