import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import MotoristaDashboard from './pages/Motorista/MotoristaDashboard';
import Usuarios from './pages/Usuarios';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      
      {}
      <Route
        path="/admin/dashboard"
        element={<ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>}
      />
      <Route
        path="/admin/usuarios"
        element={<ProtectedRoute role="ADMIN"><Usuarios /></ProtectedRoute>}
      />
      <Route
        path="/motorista/dashboard"
        element={<ProtectedRoute role="MOTORISTA"><MotoristaDashboard /></ProtectedRoute>}
      />
    </Routes>
  );
}

export default App;
