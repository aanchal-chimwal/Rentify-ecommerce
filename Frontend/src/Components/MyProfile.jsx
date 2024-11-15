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
          `http://localhost:5001/getregister/${userId}`
        );
        if (res.data) {
          setProfile(res.data?.user); // Assuming response.data contains the user data
        } else {
          setError("User data not found");
        }
      } catch (err) {
        setError(
          `Error: ${err.response?.status || "Unknown"} - ${
            err.response?.data?.message || "An error occurred"
          }`
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-bold text-center text-white bg-orange-600 py-3 rounded-lg mb-6">
          My Profile
        </h2>
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="space-y-4">
            <div className="text-lg">
              <span className="font-bold">Name: </span>
              {profile?.name || "N/A"}
            </div>
            <div className="text-lg">
              <span className="font-bold">Email: </span>
              {profile?.email || "N/A"}
            </div>
            <div className="text-lg">
              <span className="font-bold">Phone Number: </span>
              {profile?.Number || "N/A"}
            </div>
            <div className="text-lg">
              <span className="font-bold">Address: </span>
              {profile?.address || "N/A"}
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <input
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-600"
              type="text"
              name="name"
              placeholder="Update Name"
              value={profile?.name || ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-orange-600"
              type="text"
              name="address"
              placeholder="Update Address"
              value={profile?.address || ""}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
