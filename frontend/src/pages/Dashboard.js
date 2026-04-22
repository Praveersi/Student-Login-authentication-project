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

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  useEffect(() => {
    axios.get("https://student-login-authentication-project.onrender.com", {
      headers: { Authorization: token }
    })
    .then(res => setUser(res.data))
    .catch(() => alert("Error loading user"));
  }, [token]);

  const updatePassword = async () => {
    await axios.put("http://localhost:5000/api/update-password", password, {
      headers: { Authorization: token }
    });
    alert("Password updated");
  };

  const updateCourse = async () => {
    await axios.put("http://localhost:5000/api/update-course", { course }, {
      headers: { Authorization: token }
    });
    alert("Course updated");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return <h3>Loading...</h3>;

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
        <input className="input" placeholder="Old Password"
          onChange={e => setPassword({ ...password, oldPassword: e.target.value })} />

        <input className="input" placeholder="New Password"
          onChange={e => setPassword({ ...password, newPassword: e.target.value })} />

        <button className="btn btn-blue" onClick={updatePassword}>
          Update Password
        </button>
      </div>

      <div className="section">
        <input className="input" placeholder="New Course"
          onChange={e => setCourse(e.target.value)} />

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