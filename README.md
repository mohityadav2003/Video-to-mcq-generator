# 🎓 Video to MCQ Generator (Annam AI)

An intelligent tool that generates multiple choice questions (MCQs) from educational videos using AI.

---

## 📦 Project Structure

annamAi/
├── ai-service/ # AI logic for transcription and MCQ generation
├── client/ # React frontend with drag-and-drop upload
├── server/ # Express backend handling uploads and APIs
├── .gitignore
└── README.md

---

## 🚀 Features

- 🎥 Upload educational video files
- 🧠 AI-generated transcript using speech-to-text
- ❓ Automatic MCQ generation from the transcript
- 🖥️ React-based interactive frontend
- 🔌 Express + MongoDB backend
- 🔐 Modular AI service (supports OpenAI or custom models)

---

## 🛠️ Tech Stack

- **Frontend**: React, Axios
- **Backend**: Node.js, Express, Multer
- **Database**: MongoDB (via Mongoose)
- **AI**: Custom logic (OpenAI-compatible)
- **File Handling**: Drag-and-drop + Multipart file upload

---

## 🧪 Getting Started

### 1. Clone the Repository

git clone https://github.com/mohityadav2003/Video-to-mcq-generator.git
cd Video-to-mcq-generator
2. Install Dependencies
Install for all 3 services:

cd client
npm install

cd ../server
npm install

cd ../ai-service
npm install
3. Set Up Environment Variables
Create .env files in server/ and ai-service/. Example:

server/.env
PORT=5001
MONGO_URI=mongodb://localhost:27017/your-db-name
AI_SERVICE_URL=http://localhost:8000
ai-service/.env

PORT=5002
OPENAI_API_KEY=your-openai-key
Replace values with your actual configurations.

4. Run the Project
In separate terminals:


# Terminal 1: Run AI Service
cd ai-service
npm start

# Terminal 2: Run Backend Server
cd server
npm start

# Terminal 3: Run Frontend
cd client
npm start
🧠 How It Works
Drag and drop a video in the UI

Video is uploaded and stored

Transcript is generated via AI service

Based on transcript segments, MCQs are generated

UI displays both the transcript and MCQs
