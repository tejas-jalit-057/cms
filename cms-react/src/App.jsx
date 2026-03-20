import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import AdminDashboard from './pages/admin/AdminDashboard'
import FacultyDashboard from './pages/faculty/FacultyDashboard'
import StudentDashboard from './pages/student/StudentDashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/admin"   element={<AdminDashboard />} />
      <Route path="/faculty" element={<FacultyDashboard />} />
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
