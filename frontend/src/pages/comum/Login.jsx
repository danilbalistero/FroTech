import React from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../../service/authService';
import { jwtDecode } from "jwt-decode";
import './Auth.css';

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const resposta = await login(email, senha);

            localStorage.setItem('authToken', resposta.token);

            const usuarioDecodificado = jwtDecode(resposta.token);
            const role = usuarioDecodificado.role;

            localStorage.setItem('userRole', role);

            if (resposta.alterarSenha) {
                navigate('/definir-senha');
            } else if (role === 'ADMIN') {
                navigate('/admin/dashboard');
            } else if (role === 'MOTORISTA') {
                navigate('/motorista/dashboard');
            } else {
                alert('Perfil de usuário não reconhecido.');
            }

        } catch (error) {
            console.error('Erro ao realizar login:', error);
            alert('Email ou senha incorretos. Tente novamente.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="senha">Senha:</label>
                        <input
                            type='password'
                            id="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
};

export default Login;