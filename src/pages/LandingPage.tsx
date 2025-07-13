import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const emailRegex = /^\S+@\S+\.\S+$/;

const isMobile = () => window.innerWidth <= 700;

const LandingPage: React.FC = () => {
  const [mode, setMode] = useState<'none' | 'create' | 'join'>('none');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [createdCode, setCreatedCode] = useState('');
  const [error, setError] = useState('');
  const [mobile, setMobile] = useState(isMobile());
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/api/create-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });
      const data = await res.json();
      if (res.ok) {
        setCreatedCode(data.code);
        setTimeout(() => {
          navigate(`/session/${data.code}`, { state: { name, email, isAdmin: true } });
        }, 1200);
      } else {
        setError(data.error || 'Failed to create room.');
      }
    } catch {
      setError('Server error.');
    }
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/api/join-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, code: roomCode })
      });
      const data = await res.json();
      if (res.ok) {
        navigate(`/session/${roomCode}`, { state: { name, email, isAdmin: false } });
      } else {
        setError(data.error || 'Failed to join room.');
      }
    } catch {
      setError('Server error.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', minWidth: '100vw', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {/* Header */}
      <header style={{ width: '100%', background: 'rgba(255,255,255,0.95)', boxShadow: '0 2px 12px rgba(44,62,80,0.04)', padding: '1.2rem 0', position: 'sticky', top: 0, zIndex: 10, marginBottom: '2rem' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: '2rem', letterSpacing: '1px', color: 'transparent', background: 'linear-gradient(90deg, #11998e 0%, #38ef7d 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Doubtly</span>
        </div>
      </header>
      <main style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '2.5rem', color: '#2d3a4b', letterSpacing: '1px', textAlign: 'center' }}>Welcome to Doubtly</h1>
        {mode === 'none' && (
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexDirection: mobile ? 'column' : 'row', width: mobile ? '100%' : undefined }}>
            <button
              onClick={() => setMode('create')}
              style={{
                background: 'linear-gradient(90deg, #6a82fb 0%, #11998e 100%)',
                fontSize: mobile ? '1rem' : '1.2rem',
                minWidth: 120,
                width: mobile ? '100%' : undefined,
                margin: mobile ? '0 0.5rem 0.7rem 0.5rem' : undefined,
                padding: mobile ? '0.7rem 0.5rem' : undefined,
              }}
            >
              Create Chat
            </button>
            <button
              onClick={() => setMode('join')}
              style={{
                background: 'linear-gradient(90deg, #38ef7d 0%, #fc5c7d 100%)',
                fontSize: mobile ? '1rem' : '1.2rem',
                minWidth: 120,
                width: mobile ? '100%' : undefined,
                margin: mobile ? '0 0.5rem' : undefined,
                padding: mobile ? '0.7rem 0.5rem' : undefined,
              }}
            >
              Join Chat
            </button>
          </div>
        )}
        {mode === 'create' && !createdCode && (
          <form className="form-container" onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#fff', padding: '2.5rem 2rem', borderRadius: '20px', boxShadow: '0 8px 32px rgba(44,62,80,0.10)', minWidth: 320, maxWidth: 400, width: '100%' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.3rem', color: '#11998e', marginBottom: '0.5rem', textAlign: 'center' }}>Create a New Chat Room</h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            {error && <div style={{ color: 'red', fontSize: '1rem', marginBottom: '-1rem', textAlign: 'center' }}>{error}</div>}
            <button type="submit" style={{ background: 'linear-gradient(90deg, #6a82fb 0%, #11998e 100%)', fontWeight: 700 }}>Create Room</button>
            <button type="button" onClick={() => { setMode('none'); setName(''); setEmail(''); setError(''); }} style={{ background: 'none', color: '#888', marginTop: '0.5rem', fontWeight: 600, boxShadow: 'none' }}>Back</button>
          </form>
        )}
        {mode === 'create' && createdCode && (
          <div className="form-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', background: '#fff', padding: '2.5rem 2rem', borderRadius: '20px', boxShadow: '0 8px 32px rgba(44,62,80,0.10)', minWidth: 320, maxWidth: 400, width: '100%' }}>
            <div style={{ fontSize: '1.2rem', color: '#2d3a4b', fontWeight: 600 }}>Room Created!</div>
            <div style={{ fontSize: '1.7rem', fontWeight: 700, letterSpacing: '2px', color: '#11998e', background: '#f5f7fa', padding: '0.7rem 1.5rem', borderRadius: '10px' }}>{createdCode}</div>
            <div style={{ color: '#888', fontSize: '1rem', textAlign: 'center' }}>Share this code with others to join the chat.</div>
            <button type="button" onClick={() => { setMode('none'); setName(''); setEmail(''); setCreatedCode(''); setError(''); }} style={{ background: 'none', color: '#888', marginTop: '0.5rem', fontWeight: 600, boxShadow: 'none' }}>Back to Home</button>
          </div>
        )}
        {mode === 'join' && (
          <form className="form-container" onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#fff', padding: '2.5rem 2rem', borderRadius: '20px', boxShadow: '0 8px 32px rgba(44,62,80,0.10)', minWidth: 320, maxWidth: 400, width: '100%' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.3rem', color: '#38ef7d', marginBottom: '0.5rem', textAlign: 'center' }}>Join a Chat Room</h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter room code"
              value={roomCode}
              onChange={e => setRoomCode(e.target.value.toUpperCase())}
              required
              style={{ letterSpacing: '2px' }}
            />
            {error && <div style={{ color: 'red', fontSize: '1rem', marginBottom: '-1rem', textAlign: 'center' }}>{error}</div>}
            <button type="submit" style={{ background: 'linear-gradient(90deg, #38ef7d 0%, #fc5c7d 100%)', fontWeight: 700 }}>Join Room</button>
            <button type="button" onClick={() => { setMode('none'); setName(''); setEmail(''); setRoomCode(''); setError(''); }} style={{ background: 'none', color: '#888', marginTop: '0.5rem', fontWeight: 600, boxShadow: 'none' }}>Back</button>
          </form>
        )}
      </main>
    </div>
  );
};

export default LandingPage; 