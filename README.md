cat << 'EOF' > README.md
# Notebook

A full-stack Notebook application built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Firebase Authentication**.

#Images

<img width="1968" height="1744" alt="notebook-j9y8 vercel app_" src="https://github.com/user-attachments/assets/e8f59f04-eeb6-4753-9a8f-62421143d5b3" />
<img width="1968" height="1284" alt="notebook-j9y8 vercel app_login" src="https://github.com/user-attachments/assets/f69cd48e-2959-479a-a88b-f8c7549d5f86" />
<img width="1905" height="901" alt="Screenshot 2026-03-19 195157" src="https://github.com/user-attachments/assets/67b53411-5c48-4818-b7ce-0d365de60011" />
<img width="1897" height="903" alt="Screenshot 2026-03-19 195214" src="https://github.com/user-attachments/assets/e42c370c-a388-43da-b346-b59d1ec3e52c" />
<img width="1893" height="901" alt="Screenshot 2026-03-19 195242" src="https://github.com/user-attachments/assets/ac80d070-c99a-4610-9b90-dd354d32c53c" />

(Highly recommended: use Vercel for frontend and backend deployment)
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
