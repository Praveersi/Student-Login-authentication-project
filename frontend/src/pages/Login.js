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
        "https://student-login-authentication-project-1.onrender.com/api/login",
        data
      );

      console.log("LOGIN RESPONSE:", res.data);

      // ✅ Extract token properly
      const token = res.data?.token;

      // ✅ Check if token exists
      if (!token) {
        alert("Token not received from server");
        return;
      }

      // ✅ Save token
      localStorage.setItem("token", token);

      alert("Login Successful");

      // ✅ Redirect
      navigate("/dashboard");

    } catch (err) {
      console.log("ERROR:", err.response);
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Login</h2>

        <input
          className="input"
          placeholder="Email"
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <button className="btn btn-blue" onClick={login}>
          Login
        </button>

        <p className="link" onClick={() => navigate("/")}>
          Create Account
        </p>
      </div>
    </div>
  );
}