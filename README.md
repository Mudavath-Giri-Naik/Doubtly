# Doubtly

[Live Website](https://doubtly.netlify.app/)

---

## Overview
Doubtly is a real-time Q&A and chat platform designed for classrooms, webinars, and collaborative sessions. It enables students to join sessions, ask questions, and interact with professors or moderators in a seamless, user-friendly environment. The platform is optimized for both desktop and mobile devices, ensuring accessibility and ease of use for all participants.

---

## Tech Stack
- **Frontend:** React, TypeScript, Vite
- **Routing:** React Router DOM
- **Styling:** CSS (custom, responsive, mobile-first)
- **Backend:** (Assumed) Node.js with WebSocket support (for real-time chat)
- **Deployment:** Netlify (static hosting for frontend)

---

## Problem Statement
Traditional classroom and webinar Q&A sessions often suffer from:
- Lack of anonymity or comfort for students to ask questions
- Difficulty in managing and tracking questions in real time
- Poor mobile experience for remote or hybrid participants

---

## Solution
Doubtly addresses these issues by providing:
- A simple interface for students to join sessions using a code or link
- Real-time chat and Q&A with instant updates via WebSockets
- Responsive design for seamless use on both desktop and mobile
- Easy session management for professors, including the ability to end sessions
- Netlify-friendly routing for client-side navigation (no 404s on refresh)

---

## Technical Implementation

### 1. **Frontend (React + Vite + TypeScript)**
- **Component Structure:**
  - `LandingPage`: Entry point for users to create or join sessions
  - `ProfessorDashboard`: (If implemented) For session management
  - `StudentJoinForm`: For students to enter session details
  - `ChatRoom`: Real-time chat interface for Q&A
  - `MessageCard`, `EndSessionModal`, etc.: UI components for chat and session control
- **Routing:**
  - Uses React Router DOM for SPA navigation
  - Handles routes like `/`, `/professor`, `/student`, `/session/:sessionId`
- **Responsive Design:**
  - Custom CSS with media queries for mobile and desktop
  - Ensures chat input and controls are always accessible on all devices

### 2. **Real-Time Communication**
- **WebSocket Integration:**
  - ChatRoom component connects to a WebSocket server (e.g., ws://localhost:4000)
  - Handles join, message, participant updates, and session end events

### 3. **Netlify Deployment & Routing**
- **_redirects File:**
  - Placed in `public/_redirects` with the rule:
    ```
    /*    /index.html   200
    ```
  - Ensures all client-side routes are handled by React Router (no 404s on refresh)
- **Vite Build:**
  - Vite automatically copies everything from `public/` (including `_redirects`) to `dist/`
  - No extra plugins required for static file copying

### 4. **How to Run Locally**
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Deploy the contents of `dist/` to Netlify or your preferred static host

---

## Troubleshooting
- **404 on Refresh (Netlify):**
  - Ensure `_redirects` is present in `public/` with the correct rule
  - No need for extra Vite plugins for copying static files
- **WebSocket Errors:**
  - Make sure your backend WebSocket server is running and accessible
- **Mobile UI Issues:**
  - The CSS is designed to be mobile-first; if you encounter issues, check for viewport or flexbox problems

---

## License
MIT (or specify your license here)
