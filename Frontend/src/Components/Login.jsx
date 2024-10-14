import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(null); // Clear previous success message

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
        const userId = response.data.user?.id; // Adjust this based on your backend response
        const token = response.data.token;

        if (userId) {
          localStorage.setItem("id", userId); // Store user ID in localStorage
        } else {
          console.error("User ID not found in the response");
        }

        localStorage.setItem("token", token); // Store the token
        setSuccess("Login successful! Keep shopping.");
        navigate("/home");
        // navigate(`/profile/${userId}`); // Redirect to the profile page
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      if (err.response) {
        setError(
          err.response.data.message || "Invalid credentials. Please try again."
        );
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
          {success && (
            <p className="text-green-500 text-center mt-2">{success}</p>
          )}

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
