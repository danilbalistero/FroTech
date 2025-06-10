import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    
    if (role && decoded.role !== role) {
      return <Navigate to="/login" />;
    }

    return children;
  } catch (error) {
    console.error('Token inválido:', error);
    return <Navigate to="/login" />;
  }
}
