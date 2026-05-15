import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Successful 🚀");

      navigate("/dashboard");

    } catch (error) {

      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">

      <div className="bg-gray-900 p-10 rounded-2xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="p-4 rounded-xl bg-gray-800 text-white outline-none border border-gray-700 focus:border-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition text-white p-4 rounded-xl font-semibold text-lg"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;