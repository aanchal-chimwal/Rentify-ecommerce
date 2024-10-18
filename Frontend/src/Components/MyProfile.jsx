import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MyProfile = () => {
  const { id } = useParams(); // Get the id from the URL
  const userId = id || localStorage.getItem("id"); // Fetch user ID from localStorage if not found in useParams
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!userId || !token) {
        setProfile(null);
        setError("No Information available");

        return;
      }
      try {
        const res = await axios.get(
          `http://localhost:5001/getregister/${userId}`,
          {
            // headers: {
            //   Authorization: `Bearer ${token}`,
            // },
          }
        );

        if (res.data) {
          setProfile(res.data?.user); // Assuming response.data contains the user data
        } else {
          setError("User data not found");
        }
      } catch (err) {
        // Server responded with a status other than 200
        setError(
          `Error: ${err.response.status} - ${err.response.data.message}`
        );
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `http://localhost:5001/registers/${userId}`,
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use token for authorization
          },
        }
      );
      console.log("Profile updated:", res.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="mt-10">
      {" "}
      <div className="max-w-lg mx-auto p-8  shadow-lg rounded-lg ">
        <h2 className="text-3xl font-bold text-center rounded-lg text-black mb-8 border-b-2 p-4 bg-orange-600 border-orange-500 pb-3">
          My Profile
        </h2>

        <div className="m-2 p-3 ">
          <h1 className="text-3xl  text-black font-bold mt-2">
            Name:{" "}
            <span className="text-2xl text-black">
              {profile?.name || "N/A"}
            </span>
          </h1>
          <h1 className="text-3xl  text-black font-bold mt-2">
            Email:{" "}
            <span className="text-2xl text-black">
              {profile?.email || "N/A"}
            </span>
          </h1>
          <h1 className="text-3xl  text-black font-bold mt-2">
            Phone Number:{" "}
            <span className="text-2xl text-black">
              {profile?.Number || "N/A"}
            </span>
          </h1>
          <h1 className="text-3xl  text-black font-bold mt-2">
            Address:{" "}
            <span className="text-2xl text-black">
              {profile?.address || "N/A"}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
