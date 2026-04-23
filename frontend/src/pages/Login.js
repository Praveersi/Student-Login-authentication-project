import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "https://lost-found-item-management-system-yyr1.onrender.com/api/login",
        data
      );

      const token = res.data?.token;

      if (!token) {
        alert("Token not received from server");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);

      alert("Login Successful");
      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">

        {/* ICON */}
        <div className="icon">🔐</div>

        {/* TITLE */}
        <h2 className="title">Lost & Found</h2>
        <p className="subtitle">Login to manage your items</p>

        {/* INPUTS */}
        <input
          className="input"
          placeholder="Email"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
        />

        <input
          type="password"
          className="input"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        {/* BUTTON */}
        <button
          className="btn btn-blue"
          onClick={login}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* LINK */}
        <p className="link" onClick={() => navigate("/")}>
          New user? Register here
        </p>

      </div>
    </div>
  );
}