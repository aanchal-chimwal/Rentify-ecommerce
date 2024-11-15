import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConpassword] = useState("");
  const [Number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmition = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== conpassword) {
      setError("Passwords do not match");
      return;
    }

    const signupData = { name, email, password, Number, address };

    try {
      const response = await axios.post(
        "http://localhost:5001/register",
        signupData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setSuccess("Signup successful! Redirecting to login...");
        const userId = response.data.newRegister?.id || response.data?.user?.id;
        if (userId) localStorage.setItem("id", userId);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(response.data.message || "Signup failed");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Signup failed");
      } else if (err.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmition}
        className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Sign Up
        </h1>
        <div className="space-y-4">
          <input
            className="w-full h-12 px-4 border rounded-full focus:ring-2 focus:ring-purple-600 focus:outline-none"
            type="text"
            value={name}
            id="name"
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="w-full h-12 px-4 border rounded-full focus:ring-2 focus:ring-purple-600 focus:outline-none"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full h-12 px-4 border rounded-full focus:ring-2 focus:ring-purple-600 focus:outline-none"
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="w-full h-12 px-4 border rounded-full focus:ring-2 focus:ring-purple-600 focus:outline-none"
            type="password"
            id="conpassword"
            value={conpassword}
            placeholder="Confirm Password"
            onChange={(e) => setConpassword(e.target.value)}
            required
          />
          <input
            className="w-full h-12 px-4 border rounded-full focus:ring-2 focus:ring-purple-600 focus:outline-none"
            type="tel"
            id="Number"
            placeholder="Phone Number"
            value={Number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          <input
            className="w-full h-12 px-4 border rounded-full focus:ring-2 focus:ring-purple-600 focus:outline-none"
            type="text"
            id="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-center mt-2 text-sm">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-center mt-2 text-sm">{success}</p>
        )}

        <div className="flex justify-center items-center mt-6">
          <button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg font-bold py-3 rounded-full transition duration-200"
            type="submit"
          >
            Sign up
          </button>
        </div>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 hover:underline">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
