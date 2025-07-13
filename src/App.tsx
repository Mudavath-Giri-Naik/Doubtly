import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ProfessorDashboard from './pages/ProfessorDashboard';
import StudentJoinForm from './pages/StudentJoinForm';
import ChatRoom from './pages/ChatRoom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/professor" element={<ProfessorDashboard />} />
        <Route path="/student" element={<StudentJoinForm />} />
        <Route path="/session/:sessionId" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
