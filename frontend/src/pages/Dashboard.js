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

  const [item, setItem] = useState({
    name: "",
    description: "",
    type: "Lost",
    location: "",
    contact: ""
  });

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  // Redirect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://student-login-authentication-project.onrender.com/api/me",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setUser(res.data);

      } catch {
        alert("Session expired");
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  // Fetch items
  const fetchItems = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://student-login-authentication-project.onrender.com/api/items",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add / Update item
  const addItem = async () => {
    const token = localStorage.getItem("token");

    if (editingId) {
      await axios.put(
        `https://student-login-authentication-project.onrender.com/api/items/${editingId}`,
        item,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Item updated");
      setEditingId(null);
    } else {
      await axios.post(
        "https://student-login-authentication-project.onrender.com/api/items",
        item,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Item added");
    }

    setItem({
      name: "",
      description: "",
      type: "Lost",
      location: "",
      contact: ""
    });

    fetchItems();
  };

  // Delete item
  const deleteItem = async (id) => {
    const token = localStorage.getItem("token");

    await axios.delete(
      `https://student-login-authentication-project.onrender.com/api/items/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Item deleted");
    fetchItems();
  };

  // Update password
  const updatePassword = async () => {
    const token = localStorage.getItem("token");

    await axios.put(
      "https://student-login-authentication-project.onrender.com/api/update-password",
      password,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Password updated");
  };

  // Update course
  const updateCourse = async () => {
    const token = localStorage.getItem("token");

    await axios.put(
      "https://student-login-authentication-project.onrender.com/api/update-course",
      { course },
      { headers: { Authorization: `Bearer ${token}` } }
    );

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

        <h2 className="title">📦 Lost & Found Dashboard</h2>

        {/* USER */}
        <div className="section">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Course:</b> {user.course}</p>
        </div>

        {/* PASSWORD */}
        <div className="section">
          <input placeholder="Old Password"
            onChange={e => setPassword({ ...password, oldPassword: e.target.value })} />

          <input placeholder="New Password"
            onChange={e => setPassword({ ...password, newPassword: e.target.value })} />

          <button onClick={updatePassword}>Update Password</button>
        </div>

        {/* COURSE */}
        <div className="section">
          <input placeholder="New Course"
            onChange={e => setCourse(e.target.value)} />

          <button onClick={updateCourse}>Update Course</button>
        </div>

        {/* ADD / UPDATE ITEM */}
        <div className="section">
          <h3>{editingId ? "Update Item" : "Add Item"}</h3>

          <input placeholder="Item Name"
            value={item.name}
            onChange={e => setItem({ ...item, name: e.target.value })} />

          <input placeholder="Description"
            value={item.description}
            onChange={e => setItem({ ...item, description: e.target.value })} />

          <select
            value={item.type}
            onChange={e => setItem({ ...item, type: e.target.value })}
          >
            <option>Lost</option>
            <option>Found</option>
          </select>

          <input placeholder="Location"
            value={item.location}
            onChange={e => setItem({ ...item, location: e.target.value })} />

          <input placeholder="Contact"
            value={item.contact}
            onChange={e => setItem({ ...item, contact: e.target.value })} />

          <button onClick={addItem}>
            {editingId ? "Update Item" : "Add Item"}
          </button>
        </div>

        {/* SEARCH */}
        <div className="section">
          <input
            placeholder="Search items..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* DISPLAY ITEMS */}
        <div className="section">
          <h3>All Items</h3>

          {items
            .filter(i =>
              i.name.toLowerCase().includes(search.toLowerCase()) ||
              i.type.toLowerCase().includes(search.toLowerCase())
            )
            .map((i) => (
              <div key={i._id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
                <p><b>{i.name}</b> ({i.type})</p>
                <p>{i.description}</p>
                <p>{i.location}</p>
                <p>{i.contact}</p>

                <button onClick={() => {
                  setItem(i);
                  setEditingId(i._id);
                }}>
                  Edit
                </button>

                <button onClick={() => deleteItem(i._id)}>
                  Delete
                </button>
              </div>
            ))}
        </div>

        <button onClick={logout}>Logout</button>

      </div>
    </div>
  );
}