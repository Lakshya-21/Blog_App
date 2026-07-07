# 🚀 Blogify - AI Powered Blogging Platform

Blogify is a full-stack blogging platform that allows users to create, edit, and share blogs with secure authentication. It also integrates Google Gemini AI to generate concise summaries for blog posts and intelligently caches them to reduce unnecessary API calls.

---

## 🌐 Live Demo

🔗 http://blogify-env.eba-2f7mssjc.ap-south-1.elasticbeanstalk.com/

---

## ✨ Features

### 👤 Authentication
- User Signup & Login
- JWT-based Authentication
- Secure Logout
- Protected Routes

### 📝 Blog Management
- Create Blogs
- Read Blogs
- Edit Blogs
- Delete Blogs
- Upload Cover Images

### 💬 Comments
- Add comments on blogs
- View all comments on a blog

### 🤖 AI Blog Summarization
- Integrated Google Gemini API
- Generate concise AI summaries
- Summary generated only once
- Cached in MongoDB to minimize AI API requests
- Faster response for future requests

### 🔒 Authorization
- Only the owner of a blog can edit or delete it

### ☁️ Deployment
- Deployed on AWS Elastic Beanstalk
- MongoDB Atlas for cloud database

---

# 🛠️ Tech Stack

### Backend
- Node.js
- Express.js

### Frontend
- EJS
- Bootstrap 5
- HTML
- CSS

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JWT
- Cookies

### AI
- Google Gemini API

### Cloud
- AWS Elastic Beanstalk

---

# 📂 Project Structure

```
Blogify
│
├── middlewares/
├── models/
├── public/
│   ├── images/
│   └── uploads/
├── routes/
├── services/
├── views/
│   ├── partials/
│   └── *.ejs
├── app.js
├── package.json
└── README.md
```

---

# ⚡ AI Summary Workflow

```
User clicks "Summarize"

        │
        ▼

Check if summary already exists

        │
   ┌────┴────┐
   │         │
 Exists    Doesn't Exist
   │         │
Return     Gemini API
Summary        │
               ▼
       Generate Summary
               │
               ▼
     Store in MongoDB
               │
               ▼
        Return Summary
```

This caching strategy significantly reduces API calls while improving response time.

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/<Lakshya-21>/blogify.git
```

Move into the project

```bash
cd blogify
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=8000

MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_secret

GEMINI_API_KEY=your_gemini_api_key
```

Run the application

```bash
npm start
```

or

```bash
npm run dev
```

---

# 💡 Future Improvements

- Like & Unlike Blogs
- User Profiles
- Search Blogs
- Pagination
- Rich Text Editor
- Bookmark Blogs
- AI Chat with Blog
- AI Tag Generation
- Multi-language AI Summaries

---

# 📚 What I Learned

- Building scalable Express applications
- JWT Authentication
- MongoDB relationships using Mongoose
- File uploads with Multer
- Integrating Google Gemini API
- Optimizing AI usage through summary caching
- Deploying Node.js applications on AWS Elastic Beanstalk
- Managing cloud databases using MongoDB Atlas

---

# 👨‍💻 Author

**Lakshya Mishra**

GitHub: https://github.com/Lakshya-21

LinkedIn: https://www.linkedin.com/in/lakshya-mishra-38b3b9306/

---

## ⭐ If you like this project, consider giving it a star!
