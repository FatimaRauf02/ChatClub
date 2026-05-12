# What is ChatClub

A MERN Stack (MongoDB, Express, React, Node.js) real-time chat and video calling application built with the MERN stack. It is a platform where people who want to learn a new language can connect with native speakers. 
You can chat in real time make video calls and practice speaking with people from around the world — completely free.


## What You Can Do

- Create an account and set up your profile with a photo, bio and languages
- Send and accept friend requests
- Chat in real time with friends
- React to messages
- Make one-on-one video calls with screen sharing
- Update your profile info and change your password anytime
- See unread message counts per conversation


## Tech Stack

**Frontend**
- React 19
- Vite
- Tailwind CSS + DaisyUI
- TanStack Query (data fetching and caching)
- Zustand (state management)
- Stream Chat React SDK (chat UI)
- Stream Video React SDK (video calls)
- Axios
- React Router v7
- Lucide React (icons)

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing
- Stream Chat SDK (messaging backend)
- Cookie Parser + CORS


## Features in Detail

### Authentication
- Signup with name, email and password
- Login / Logout
- Protected routes — unauthenticated users are redirected to login
- Change password from profile settings

### Onboarding
- New users complete a profile before accessing the app
- Upload a profile photo
- Set bio, native language, learning language and location

### Friends
- Browse recommended users
- Send, receive and accept friend requests
- Notifications page for pending requests

### Chat
- Real-time messaging powered by Stream
- React to messages with emojis
- Send images, videos and files
- Clear entire chat history
- Unread message count badges

### Video Calls
- Start a video call by sending a link inside the chat
- Screen sharing support
- Reactions during calls
- Record calls

### Profile
- View and edit all profile information inline
- Change profile photo (view or upload)
- Change password


## How to Run

1. Clone the repo and go into the folder

2. Inside the backend folder create a .env file

        PORT=5001
        MONGODB_URI=your_mongodb_uri
        JWT_SECRET_KEY=your_secret
        STREAM_API_KEY=your_key
        STREAM_API_SECRET=your_secret

3. Inside the frontend folder create a .env file

        VITE_STREAM_API_KEY=your_stream_api_key

4. Run the backend — open a terminal in the backend folder

        npm install
        npm run dev

5. Run the frontend — open another terminal in the frontend folder

        npm install
        npm run dev

6. Open http://localhost:5173 in your browser

## 🌐 Live Link

intuitive-adaptation-production-0108.up.railway.app 

<img width="800" height="398" alt="1" src="https://github.com/user-attachments/assets/12d2e956-034d-4c98-b55c-14c37fa2b38c" />
<img width="652" height="414" alt="2" src="https://github.com/user-attachments/assets/e981ba26-e3de-40be-8a37-dfc84b31ff1c" />
<img width="497" height="438" alt="3" src="https://github.com/user-attachments/assets/15245e30-56e1-4f42-b2a7-81e3cab78b24" />
<img width="947" height="435" alt="4" src="https://github.com/user-attachments/assets/172fe9f6-06a5-4f66-bad4-9bba1611a9db" />
<img width="939" height="401" alt="5" src="https://github.com/user-attachments/assets/38f1a73a-67d7-4aa2-b72d-fac00f0fb4e1" />
<img width="948" height="435" alt="6" src="https://github.com/user-attachments/assets/f8f5f28e-ec1b-4c90-8cf0-8272a5c3f464" />
<img width="716" height="436" alt="videocall" src="https://github.com/user-attachments/assets/9b3ae781-affa-4db1-96a6-cef28f1a6918" />


## License

This project is open source and available under the MIT License.
