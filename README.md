cat << 'EOF' > README.md
# Notebook

A full-stack Notebook application built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Firebase Authentication**.

## 🚀 Live Demo

Check out the live application here: **[https://notebook-j9y8.vercel.app](https://notebook-j9y8.vercel.app)**

## 🛠️ Tech Stack

- **Frontend:** React, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase Auth
- **Deployment:** Vercel

## ✨ Features

- **User Authentication:** Secure signup and login powered by Firebase.
- **Create & Manage Notes:** Full CRUD (Create, Read, Update, Delete) functionality.
- **Responsive Interface:** Designed for both desktop and mobile use.

## 💻 Quick Start

To set up the project locally, copy and paste this entire script into your terminal:

# 1. Clone the repository and enter the folder
```bash
git clone [https://github.com/jay240322/Notebook.git](https://github.com/jay240322/Notebook.git)
cd Notebook
```
# 2. Install Backend Dependencies & Create .env
```bash
cd backend
npm install
# Creates a default .env file (Remember to update MONGO_URI with your own!)
echo "MONGO_URI=your_mongodb_connection_string" > .env
echo "PORT=5000" >> .env
```
# 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```
# 4. Setup Complete
```bash
cd ..
echo "✅ Setup complete!"
echo "To run the app:"
echo "   1. Open a terminal and run 'cd backend && npm start'"
echo "   2. Open a second terminal and run 'cd frontend && npm start'"
```
