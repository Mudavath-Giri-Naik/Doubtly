import React from 'react';

interface Student {
  name: string;
  email: string;
  note?: string;
}

interface ActiveStudentsListProps {
  students: Student[];
}

const ActiveStudentsList: React.FC<ActiveStudentsListProps> = ({ students }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {students.length === 0 ? (
        <div style={{ color: '#888', textAlign: 'center' }}>No active students yet.</div>
      ) : (
        students.map((student, idx) => (
          <div key={idx} style={{ background: '#e0eafc', borderRadius: '8px', padding: '0.8rem 1rem', boxShadow: '0 2px 8px rgba(44,62,80,0.04)' }}>
            <div style={{ fontWeight: 600, color: '#2d3a4b' }}>{student.name} <span style={{ color: '#888', fontWeight: 400 }}>({student.email})</span></div>
            {student.note && <div style={{ fontSize: '0.95rem', color: '#11998e' }}>Note: {student.note}</div>}
          </div>
        ))
      )}
    </div>
  );
};

export default ActiveStudentsList; 