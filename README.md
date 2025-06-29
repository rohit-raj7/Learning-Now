🎓 Online Learning Platform
A full-stack online education platform that allows educators to upload video-based courses and students to enroll, pay securely, and learn at their own pace.

🚀 Project Overview
This platform empowers educators and students through a seamless and dynamic e-learning experience. It supports role-based access, media management, payment processing, and personalized learning progress tracking.

🔧 Tech Stack
Frontend: React.js

Backend: Node.js, Express.js

Database: MongoDB

Media Management: Cloudinary

Payments: Stripe

Authentication: JWT (JSON Web Tokens)

🧩 Key Features
👨‍🏫 Educators:
Upload courses with video lectures and structured content

Secure login with role-based access control

Manage existing courses and content updates

👨‍🎓 Students:
Browse available courses and detailed descriptions

Enroll in courses with secure international payments (via Stripe)

Track enrolled courses and progress

View responsive, streamable video lectures

🔐 Security & Auth:
Role-based JWT authentication (Educator/Student)

Secure backend API endpoints

Stripe payment success/failure flow with validations

📦 Data Handling
MongoDB: Stores users, courses, and enrollment data.

Cloudinary: Hosts all video and media assets.

Stripe: Handles payments and stores transaction metadata securely.

📸 UI/UX Features
Modern and responsive design

Dynamic course pages and dashboards

Real-time updates on enrollment and progress

Feedback-ready interface for student engagement



💻 Local Development Setup
Clone the repository

bash
Copy
Edit
git clone https://github.com/yourusername/online-learning-platform.git
cd online-learning-platform
Install dependencies

bash
Copy
Edit
npm install  # for backend
cd client && npm install  # for frontend
Setup environment variables

Create .env files in both backend and frontend with necessary API keys (MongoDB URI, Stripe Secret, JWT Secret, Cloudinary credentials, etc.)

Run the app

bash
Copy
Edit
# Start backend
npm run dev

# In a new terminal, start frontend
cd client
npm start
📅 Project Timeline
Start: June 2025

Status: In progress / Completed (update accordingly)

📬 Contact
For queries or collaboration:
📧 rohit.raj.career@gmail.com

