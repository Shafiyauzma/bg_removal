# bg_removal

# EraseMate – Smart Background Removal Platform

## Project Overview

EraseMate is a full-stack web application designed to remove image backgrounds automatically using AI. The platform provides a simple and responsive interface where users can upload images and instantly remove their backgrounds with high precision.

The application integrates the ClipDrop API for AI-powered background removal and includes a credit-based usage system where users receive free credits initially and can purchase additional credits securely through Razorpay. This project demonstrates the integration of modern frontend frameworks, backend APIs, AI services, and payment gateways to build a scalable and user-friendly application.

---

## Key Features

🔹 **AI Background Removal**  
Automatically removes image backgrounds with high precision using the ClipDrop API.

🔹 **Image Upload Interface**  
Users can easily upload images and process them through a clean and intuitive UI.

🔹 **Credit-Based System**  
Users receive initial free credits and consume credits for each background removal request.

🔹 **Secure Payment Integration**  
Integrated Razorpay payment gateway to allow users to purchase additional credits.

🔹 **Modern Responsive UI**  
Built a responsive and user-friendly interface using React.js and Tailwind CSS.

🔹 **User Management System**  
Implemented backend functionality for managing user accounts and credit usage.

🔹 **Real-Time Processing**  
Fast image processing with seamless communication between frontend and backend.

---

## Tech Stack

### Frontend Technologies

🔹 React.js  
🔹 Tailwind CSS  

### Backend Technologies

🔹 Node.js  
🔹 Express.js  

### Database

🔹 MongoDB  

### API Integrations

🔹 ClipDrop API – AI Background Removal  
🔹 Razorpay – Payment Processing  

---

## Application Workflow

🔹 User uploads an image to the application.  
🔹 The React frontend sends the image to the Node.js backend.  
🔹 The backend communicates with the ClipDrop API for background removal.  
🔹 The processed image with the removed background is returned to the frontend.  
🔹 Credit usage is updated and stored in MongoDB.  
🔹 Users can download or view the processed image.

---

## Project Structure

```
EraseMate
│
├── client
│   ├── public
│   └── src
│       ├── assets
│       ├── components
│       ├── context
│       └── pages
│
├── server
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   └── config
│
└── README.md
```

---

## Installation and Setup

### 1. Clone the repository

```
git clone https://github.com/yourusername/erasemate.git
```

### 2. Navigate to the project folder

```
cd erasemate
```

### 3. Install backend dependencies

```
cd server
npm install
```

### 4. Install frontend dependencies

```
cd client
npm install
```

---

### 5. Environment Variables

Create a `.env` file inside the server folder and add:

```
MONGO_URI=your_mongodb_connection
CLIPDROP_API_KEY=your_clipdrop_api_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret
JWT_SECRET=your_secret
```

---

### 6. Run the Backend Server

```
npm run server
```

### 7. Run the Frontend Application

```
npm run dev
```

---

## Learning Outcomes

🔹 Built a full-stack AI-powered image processing application  
🔹 Integrated AI background removal APIs with web applications  
🔹 Implemented a credit-based usage system with payment gateway integration  
🔹 Managed user data and credit tracking using MongoDB  
🔹 Designed responsive interfaces using React.js and Tailwind CSS  
🔹 Developed backend APIs for image processing and user management

---

## Author

**Shafiya Uzama Vadulapalli**  
Full Stack Developer
