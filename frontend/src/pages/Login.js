import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post(
        "https://student-login-authentication-project.onrender.com/api/login",
        data
      );

      console.log("LOGIN RESPONSE:", res.data);

      const token = res.data?.token;

      if (!token) {
        alert("Token not received from server");
        return;
      }

      localStorage.setItem("token", token);

      alert("Login Successful");
      navigate("/dashboard");

    } catch (err) {
      console.log("ERROR:", err.response);
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="card">

        {/* 🔥 ICON */}
        <div className="icon">🔍</div>

        {/* 🔥 TITLE */}
        <h2 className="title">Lost & Found</h2>
        <p className="subtitle">Login to manage your items</p>

        {/* INPUTS */}
        <input
          className="input"
          placeholder="Enter Email"
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          className="input"
          placeholder="Enter Password"
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        {/* BUTTON */}
        <button className="btn btn-blue" onClick={login}>
          Login
        </button>

        {/* LINK */}
        <p className="link" onClick={() => navigate("/")}>
          New user? Register here
        </p>

      </div>
    </div>
  );
}