# 📝 Task Management Application

A full-stack task management app with:

- 🔐 User Authentication using Node.js + Express + JWT
- 📋 Task CRUD and Excel Export using Django REST Framework
- 💻 Frontend built with React.js and Tailwind CSS
- 💾 SQLite as the database for both backends

---

## 🧩 Project Structure

project-root/
├── backend1/ # Node.js Auth API (Express + SQLite + JWT)
├── backend2/ # Django REST API for Tasks + Excel Export
└── frontend/ # React + TailwindCSS UI

yaml
Copy code

---

## ✅ Features

### 1. Authentication (Node.js)
- User registration and login
- JWT-based authentication
- `/profile` route to test token

### 2. Task Management (Django)
- Create, Read, Update, Delete (CRUD) tasks
- Fields: title, description, effort (in days), due date
- Authenticated access using JWT
- Export tasks to Excel (`tasks.xlsx`)

### 3. Frontend (React.js + Tailwind CSS)
- Login and Register pages
- Task form, list, delete button
- Export to Excel button
- Responsive, clean UI

---

## ⚙️ How to Run the Project

### Sample Login

- Username: user
- Password: test


### Prerequisites

- Node.js + npm
- Python 3 + pip
- SQLite (default with Python)
- Git (optional)

---

### 🔐 Step 1: Backend 1 (Auth - Node.js)

```bash
cd backend1
npm install
npm run dev

