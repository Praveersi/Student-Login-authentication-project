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
      await axios.post("https://student-login-authentication-project.onrender.com", data);
      alert("Registered Successfully");
      navigate("/login");
    } 
      catch (err) {
  console.log(err.response);
  alert(err.response?.data?.msg || "Registration failed");
}
      
    }
  };

  return (
  <div className="container">
    <div className="card">
      <h2 className="title">Register</h2>

      <input className="input" placeholder="Name"
        onChange={e => setData({ ...data, name: e.target.value })} />

      <input className="input" placeholder="Email"
        onChange={e => setData({ ...data, email: e.target.value })} />

      <input type="password" className="input" placeholder="Password"
        onChange={e => setData({ ...data, password: e.target.value })} />

      <input className="input" placeholder="Course"
        onChange={e => setData({ ...data, course: e.target.value })} />

      <button className="btn btn-blue" onClick={register}>
        Register
      </button>

      <p className="link" onClick={() => navigate("/login")}>
        Already have an account?
      </p>
    </div>
  </div>
);
}