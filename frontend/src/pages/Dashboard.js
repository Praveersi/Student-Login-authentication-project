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
  const token = localStorage.getItem("token");

  // Redirect if not logged in
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // Fetch user data
  useEffect(() => {
    axios.get(
      "https://student-login-authentication-project.onrender.com/api/me",
      {
        headers: { Authorization: token }
      }
    )
    .then(res => setUser(res.data))
    .catch(() => alert("Error loading user"));
  }, [token]);

  // Update password
  const updatePassword = async () => {
    try {
      await axios.put(
        "https://student-login-authentication-project.onrender.com/api/update-password",
        password,
        {
          headers: { Authorization: token }
        }
      );
      alert("Password updated");
    } catch (err) {
      alert("Error updating password");
    }
  };

  // Update course
  const updateCourse = async () => {
    try {
      await axios.put(
        "https://student-login-authentication-project.onrender.com/api/update-course",
        { course },
        {
          headers: { Authorization: token }
        }
      );
      alert("Course updated");
    } catch (err) {
      alert("Error updating course");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
            onChange={e =>
              setPassword({ ...password, oldPassword: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="New Password"
            onChange={e =>
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
            onChange={e => setCourse(e.target.value)}
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