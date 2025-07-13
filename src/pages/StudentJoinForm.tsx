import React, { useState } from 'react';

const StudentJoinForm: React.FC = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    note: '',
    sessionCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle join logic
  };

  return (
    <div style={{ minHeight: '100vh', minWidth: '100vw', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2.5rem 2rem', borderRadius: '16px', boxShadow: '0 4px 24px rgba(44,62,80,0.08)', minWidth: 340, maxWidth: 400, width: '100%' }}>
        <h2 style={{ fontSize: '1.7rem', fontWeight: 700, color: '#2d3a4b', marginBottom: '1.5rem', textAlign: 'center' }}>Join as Student</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ padding: '0.9rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }} />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={{ padding: '0.9rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }} />
          <input name="name" type="text" placeholder="Name" value={form.name} onChange={handleChange} required style={{ padding: '0.9rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }} />
          <textarea name="note" placeholder="Private Note (for professor)" value={form.note} onChange={handleChange} rows={3} style={{ padding: '0.9rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem', resize: 'vertical' }} />
          <input name="sessionCode" type="text" placeholder="Session Code or Link" value={form.sessionCode} onChange={handleChange} required style={{ padding: '0.9rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' }} />
          <button type="submit" style={{ marginTop: '1rem', padding: '1rem', borderRadius: '10px', background: 'linear-gradient(90deg, #11998e 0%, #38ef7d 100%)', color: '#fff', fontWeight: 700, fontSize: '1.1rem', border: 'none', cursor: 'pointer' }}>Join Session</button>
        </div>
      </form>
    </div>
  );
};

export default StudentJoinForm; 