import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import './ChatRoom.css'; // <-- Import the new CSS file

interface Message {
  text: string;
  timestamp: number;
  senderName: string; // Added for a more complete design, though not in original logic
}

const ChatRoom: React.FC = () => {
  const { sessionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, isAdmin } = (location.state || {}) as { name: string; email: string; isAdmin: boolean };
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [participants, setParticipants] = useState(1);
  const [ended, setEnded] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // --- CORE LOGIC (UNCHANGED) ---
  useEffect(() => {
    if (!name || !email || !sessionId) {
      navigate('/');
      return;
    }
    ws.current = new WebSocket('ws://localhost:4000');
    ws.current.onopen = () => {
      ws.current?.send(JSON.stringify({ type: 'join', code: sessionId, name, email }));
    };
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // NOTE: The backend would need to send `senderName` with the message for it to appear.
      // I've designed the UI to accommodate it for a more realistic chat look.
      if (data.type === 'init') {
        setMessages(data.messages.map((m: any) => ({ text: m.text, timestamp: m.timestamp, senderName: m.senderName || 'System' })));
        setParticipants(data.users.length);
      } else if (data.type === 'message') {
        setMessages((prev) => [...prev, { text: data.message.text, timestamp: data.message.timestamp, senderName: data.message.senderName || name }]);
      } else if (data.type === 'participants') {
        setParticipants(data.count);
      } else if (data.type === 'ended') {
        setEnded(true);
        ws.current?.close();
      }
    };
    ws.current.onclose = () => {};
    return () => {
      ws.current?.close();
    };
    // eslint-disable-next-line
  }, [sessionId, name, email]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: 'message', text: input }));
      setInput('');
    }
  };

  const handleEndChat = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: 'end' }));
    }
  };

  const handleLeaveRoom = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: 'leave' }));
      ws.current.close();
    }
    navigate('/');
  };
  // --- END OF CORE LOGIC ---

  if (ended) {
    return (
      <div className="chat-page-container">
        <header className="page-header">
          <span className="logo-text">Doubtly</span>
        </header>
        <main className="main-content centered">
          <div className="ended-container">
            <h2 className="ended-title">Session Ended</h2>
            <p className="ended-message">This chat session has been closed. Thank you for participating!</p>
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Back to Home
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="chat-page-container">
      <header className="page-header">
        <span className="logo-text">Doubtly</span>
      </header>
      <main className="main-content">
        <div className="chat-container">
          <header className="chat-header">
            <div className="room-info">
              <span className="room-code-label">Room Code:</span>
              <span className="room-code">{sessionId}</span>
            </div>
            <div className="participants-info">
              <span className="participants-count">{participants}</span>
              <span className="participants-label">Participants</span>
            </div>
            <div className="action-buttons">
              {isAdmin && (
                <button onClick={handleEndChat} className="btn btn-danger">
                  End Chat
                </button>
              )}
              <button onClick={handleLeaveRoom} className="btn btn-secondary">
                Leave
              </button>
            </div>
          </header>

          <div className="message-list">
            {messages.length === 0 && (
              <div className="empty-chat-notice">
                No messages yet. Be the first to start the conversation!
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className="message-item">
                <div className="message-meta">
                   <span className="message-sender">{msg.senderName}</span>
                   <span className="message-timestamp">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="message-text">{msg.text}</p>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={sendMessage} className="message-form">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="message-input"
              disabled={ended}
              autoFocus
            />
            <button type="submit" disabled={!input.trim() || ended} className="btn btn-primary send-button">
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ChatRoom;