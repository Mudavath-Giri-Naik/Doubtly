import React from 'react';

interface MessageCardProps {
  timestamp: string;
  message: string;
  name?: string;
  email?: string;
  note?: string;
}

const MessageCard: React.FC<MessageCardProps> = ({ timestamp, message, name, email, note }) => {
  return (
    <div style={{ background: '#f5f7fa', borderRadius: '10px', padding: '1rem', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(44,62,80,0.04)' }}>
      <div style={{ fontSize: '0.95rem', color: '#888', marginBottom: '0.3rem' }}>[{timestamp}]</div>
      {name && email ? (
        <div style={{ fontWeight: 600, color: '#2d3a4b', marginBottom: '0.2rem' }}>{name} ({email})</div>
      ) : null}
      {note && (
        <div style={{ fontSize: '0.95rem', color: '#11998e', marginBottom: '0.2rem' }}>Note: {note}</div>
      )}
      <div style={{ fontSize: '1.1rem', color: '#222' }}>{message}</div>
    </div>
  );
};

export default MessageCard; 