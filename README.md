# 💰 Personal Expense Management System (MERN)

A full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js) that allows users to securely manage their daily expenses.

---

## 🚀 Features

* 🔐 User Authentication (Register & Login using JWT)
* 🔑 Secure password hashing with bcrypt
* ➕ Add new expenses
* 📋 View all personal expenses
* 📊 Organized expense tracking (Category-based)
* 🔒 Protected routes using middleware

---

## 🛠️ Tech Stack

**Frontend:**

* React.js
* Axios
* React Router

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB (Mongoose)

**Authentication:**

* JWT (JSON Web Tokens)
* bcrypt.js

---

## 📁 Project Structure

expense-manager/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   └── public/

---



## 🔐 API Endpoints

### Auth Routes

* POST /register → Register user
* POST /login → Login user & get token

### Expense Routes

* POST /expense → Add expense (Protected)
* GET /expenses → Get all expenses (Protected)

---

## 🧠 How It Works

* Users register and login
* Server generates a JWT token
* Token is stored in localStorage
* Protected APIs verify token using middleware
* Each user can manage only their own expenses

---

## ⭐ Future Improvements

* Filter expenses by category/date
* Add charts & analytics
* Export expense report (PDF/Excel)
* Dark mode UI

---

## 📌 Author

Praveer Singh
B.Tech CSE (AI)

---

## 📜 License

This project is for educational purposes.
