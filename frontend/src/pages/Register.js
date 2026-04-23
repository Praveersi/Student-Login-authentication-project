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

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const register = async () => {
    // 🔥 basic validation
    if (!data.name || !data.email || !data.password) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://lost-found-item-management-system-yyr1.onrender.com/api/register",
        data
      );

      alert("Registered Successfully");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">

        {/* ICON */}
        <div className="icon">📦</div>

        {/* TITLE */}
        <h2 className="title">Lost & Found</h2>
        <p className="subtitle">Create account to report items</p>

        {/* INPUTS */}
        <input
          className="input"
          placeholder="Name"
          value={data.name}
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
        />

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

        <input
          className="input"
          placeholder="Course / Department"
          value={data.course}
          onChange={(e) =>
            setData({ ...data, course: e.target.value })
          }
        />

        {/* BUTTON */}
        <button
          className="btn btn-green"
          onClick={register}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* LINK */}
        <p className="link" onClick={() => navigate("/login")}>
          Already have an account? Login
        </p>

      </div>
    </div>
  );
}