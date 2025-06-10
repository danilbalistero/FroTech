import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState('');

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return;
  }

  try {
    const decoded = jwtDecode(token);
    console.log('Token decodificado:', decoded); 
    setNomeUsuario(decoded.nome || 'Administrador');
  } catch (err) {
    console.error('Erro ao decodificar token:', err);
    navigate('/login');
  }
}, []);

  return (
    <div className="admin-container">
      <h2>Bem-vindo, {nomeUsuario}!</h2>

      <div className="admin-options">
        <button onClick={() => navigate('/admin/usuarios')}>
          Gerenciar Usuários
        </button>
      </div>
    </div>
  );
}
