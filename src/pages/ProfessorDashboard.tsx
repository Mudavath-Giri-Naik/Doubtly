import React from 'react';

const ProfessorDashboard: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', minWidth: '100vw', width: '100vw', height: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ flex: 1, maxWidth: 900, width: '100%', background: '#fff', borderRadius: '0', boxShadow: '0 4px 24px rgba(44,62,80,0.08)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', minHeight: '100vh' }}>
        <button style={{ padding: '1rem', fontWeight: 600, borderRadius: '10px', background: 'linear-gradient(90deg, #6a82fb 0%, #fc5c7d 100%)', color: '#fff', border: 'none', marginBottom: '1rem' }}>Start New Session</button>
        <div style={{ marginBottom: '1rem' }}>
          <span style={{ fontWeight: 500 }}>Session Link:</span>
          <div style={{ marginTop: '0.5rem', background: '#f5f7fa', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.95rem', wordBreak: 'break-all' }}>
            [session-link-placeholder]
          </div>
          <button style={{ marginTop: '0.5rem', padding: '0.5rem 1.5rem', borderRadius: '8px', background: '#11998e', color: '#fff', border: 'none', fontWeight: 500 }}>Copy</button>
        </div>
        <div style={{ background: '#f5f7fa', borderRadius: '12px', padding: '1rem', minHeight: '120px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#2d3a4b', marginBottom: '0.5rem' }}>Active Students</h2>
          <div>[Active students list will appear here]</div>
        </div>
        <div style={{ background: '#f5f7fa', borderRadius: '12px', padding: '1rem', marginBottom: '1rem', minHeight: '200px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#2d3a4b', marginBottom: '1rem' }}>Real-time Chat</h2>
          <div>[Chat messages will appear here]</div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input type="text" placeholder="Type your message..." style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }} />
          <button style={{ padding: '0.8rem 2rem', borderRadius: '8px', background: 'linear-gradient(90deg, #6a82fb 0%, #fc5c7d 100%)', color: '#fff', border: 'none', fontWeight: 600 }}>Send</button>
        </div>
        <button style={{ padding: '1rem', fontWeight: 600, borderRadius: '10px', background: 'linear-gradient(90deg, #ff5858 0%, #f09819 100%)', color: '#fff', border: 'none' }}>End Session</button>
      </div>
    </div>
  );
};

export default ProfessorDashboard; 