import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../components/Login.css';
import background from '../assets/background-rede3.png';

export default function Login() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, senha }),
      });

      if (response.ok) {
        const { token } = await response.json();
        const decoded = jwtDecode(token);
        localStorage.setItem('token', token);

        if (decoded.role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else if (decoded.role === 'MOTORISTA') {
          navigate('/motorista/dashboard');
        } else {
          setMensagem('Papel não reconhecido.');
        }
      } else {
        setMensagem('Email ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setMensagem('Erro de conexão.');
    }
  };

  return (
    <div className="login-page" style={{ backgroundImage: `url(${background})` }}>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {mensagem && <p className="mensagem">{mensagem}</p>}

        <label>Email</label>
        <input
          type="email"
          placeholder="Digite seu email"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />

        <label>Senha</label>
        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
        <p className="registrar">Não tem uma conta? Solicite ao seu gestor.</p>
      </form>
    </div>
  );
}
