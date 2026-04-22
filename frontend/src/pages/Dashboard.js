import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: ""
  });
  const [course, setCourse] = useState("");

  const navigate = useNavigate();

  // Redirect if no token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        console.log("TOKEN:", token); // debug

        const res = await axios.get(
          "https://student-login-authentication-project-1.onrender.com/api/me",
          {
            headers: {
              Authorization:  `Bearer ${token}`
            }
          }
        );

        setUser(res.data);

      } catch (err) {
        console.log("ERROR:", err.response);

        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  // Update password
  const updatePassword = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "https://student-login-authentication-project-1.onrender.com/api/update-password",
        password,
        {
          headers: {
            Authorization:  `Bearer ${token}`
          }
        }
      );

      alert("Password updated successfully");

    } catch (err) {
      alert(err.response?.data?.msg || "Error updating password");
    }
  };

  // Update course
  const updateCourse = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "https://student-login-authentication-project-1.onrender.com/api/update-course",
        { course },
        {
          headers: {
            Authorization:  `Bearer ${token}`
          }
        }
      );

      alert("Course updated successfully");

    } catch (err) {
      alert(err.response?.data?.msg || "Error updating course");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Loading state
  if (!user) return <h3>Loading... (wake server)</h3>;

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Dashboard</h2>

        <div className="section">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Course:</b> {user.course}</p>
        </div>

        <div className="section">
          <input
            className="input"
            placeholder="Old Password"
            onChange={(e) =>
              setPassword({ ...password, oldPassword: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="New Password"
            onChange={(e) =>
              setPassword({ ...password, newPassword: e.target.value })
            }
          />

          <button className="btn btn-blue" onClick={updatePassword}>
            Update Password
          </button>
        </div>

        <div className="section">
          <input
            className="input"
            placeholder="New Course"
            onChange={(e) => setCourse(e.target.value)}
          />

          <button className="btn btn-green" onClick={updateCourse}>
            Update Course
          </button>
        </div>

        <button className="btn btn-red" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}