import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    course: ""
  });

  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await axios.post(
        "https://student-login-authentication-project.onrender.com/api/register",
        data
      );

      console.log("REGISTER RESPONSE:", res.data);

      alert("Registered Successfully");
      navigate("/login");

    } catch (err) {
      console.log("ERROR:", err.response);
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="card">

        {/* 🔥 ICON */}
        <div className="icon">📦</div>

        {/* 🔥 TITLE */}
        <h2 className="title">Lost & Found</h2>
        <p className="subtitle">Create account to report items</p>

        {/* INPUTS */}
        <input
          className="input"
          placeholder="Enter Name"
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

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

        <input
          className="input"
          placeholder="Course / Department"
          onChange={(e) =>
            setData({ ...data, course: e.target.value })
          }
        />

        {/* BUTTON */}
        <button className="btn btn-green" onClick={register}>
          Register
        </button>

        {/* LINK */}
        <p className="link" onClick={() => navigate("/login")}>
          Already have an account? Login
        </p>

      </div>
    </div>
  );
}