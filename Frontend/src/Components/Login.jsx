import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(null);

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
        const userId = response.data.user?.id;
        const token = response.data.token;

        if (userId) {
          localStorage.setItem("id", userId);
        } else {
          console.error("User ID not found in the response");
        }

        localStorage.setItem("token", token);
        setSuccess("Login successful! Keep shopping.");
        navigate("/home");
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Log In
        </h1>
        <div className="space-y-4">
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            Log in
          </button>
        </div>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-purple-600 hover:underline">
            Create new account
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
