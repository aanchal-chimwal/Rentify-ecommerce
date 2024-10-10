// Signup.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConpassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmition = async (e) => {
    e.preventDefault();
    console.log("Registered successfully");
    setError("");
    setSuccess("");

    if (password !== conpassword) {
      setError("Passwords do not match");
      return;
    }

    const signupData = { name, email, password };
    // console.log("signupData", signupData);

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
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(response.data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Error in signup:", err);
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
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmition}>
        <div className="box bg-slate-400 h-[80vh] w-[60vh] rounded-xl px-4 ">
          <h1 className="font-bold text-4xl text-white flex justify-center pt-6">
            Sign Up
          </h1>
          <div className="space-y-4">
            <input
              className="h-9 w-[95%] rounded-full px-3 mt-5 ml-1"
              type="text"
              value={name}
              id="name"
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              className="h-9 w-[95%] rounded-full px-3 mt-3 ml-1"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="h-9 w-[95%] rounded-full px-3 mt-3 ml-1"
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              className="h-9 w-[95%] rounded-full px-3 mt-3 ml-1"
              type="password"
              id="conpassword"
              value={conpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConpassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mt-2">{success}</p>
          )}

          <div className="flex justify-center items-center mt-6">
            <button
              className="bg-purple-600 text-xl hover:bg-purple-800 rounded text-white h-[30px] w-[80px]"
              type="submit"
            >
              Sign up
            </button>
          </div>

          <p className="flex justify-center items-center text-white mt-4">
            Already have an account?
            <a href="/login" className="ml-2">
              <span className="text-black">Log in</span>
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
