// Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const loginData = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:5001/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Store the token
        localStorage.setItem("token", response.data.token);
        // Optionally store user info
        localStorage.setItem("user", JSON.stringify(response.data.user));
        // Redirect to dashboard or home
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } else if (err.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleLogin}>
        <div className="box bg-slate-400 h-[70vh] w-[60vh] rounded-xl px-4 ">
          <h1 className="font-bold text-4xl text-white flex justify-center pt-6">
            Log In
          </h1>
          <div className="space-y-4">
            <input
              className="h-9 w-[95%] rounded-full px-3 mt-5 ml-1"
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <div className="flex justify-center items-center mt-6">
            <button
              className="bg-purple-600 text-xl hover:bg-purple-800 rounded text-white h-[30px] w-[80px]"
              type="submit"
            >
              Log in
            </button>
          </div>

          <p className="flex justify-center items-center text-white mt-4">
            Don't have an account?
            <a href="/signup" className="ml-2">
              <span className="text-black">Create new account</span>
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
