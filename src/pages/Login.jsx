import { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // salvando JWT
        onLoginSuccess(); // dispara a navegação
      } else {
        setErro('Email ou senha inválidos');
      }
    } catch (error) {
      setErro('Erro ao conectar com o servidor');
    }
  };

  return (
    <div>
      <h2>Login do Admin</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
