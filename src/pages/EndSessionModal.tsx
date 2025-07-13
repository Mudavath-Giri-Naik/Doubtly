import React from 'react';

interface EndSessionModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const EndSessionModal: React.FC<EndSessionModalProps> = ({ open, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(44,62,80,0.25)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '2rem 2.5rem', boxShadow: '0 8px 32px rgba(44,62,80,0.18)', minWidth: 320, maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ff5858', marginBottom: '1rem' }}>End Session?</h3>
        <p style={{ color: '#2d3a4b', marginBottom: '2rem' }}>Are you sure you want to end this session? All students will be disconnected.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={onCancel} style={{ padding: '0.8rem 2rem', borderRadius: '8px', background: '#e0eafc', color: '#2d3a4b', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding: '0.8rem 2rem', borderRadius: '8px', background: 'linear-gradient(90deg, #ff5858 0%, #f09819 100%)', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>End Session</button>
        </div>
      </div>
    </div>
  );
};

export default EndSessionModal; 