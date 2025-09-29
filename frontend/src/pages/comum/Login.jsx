import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault(); 

        // Simulação de autenticação
        if (email === "admin@gmail.com" && senha === "123") {
            const token = 'token-fake-admin';
            const perfil = 'ADMIN';

            localStorage.setItem('token', token);
            localStorage.setItem('perfil', perfil);

            navigate('/admin/dashboard');
        } else if (email === "motorista@gmail.com" && senha === "123") {
            const token = 'token-fake-motorista';
            const perfil = 'MOTORISTA';
        
            localStorage.setItem('token', token);
            localStorage.setItem('perfil', perfil);

            navigate('/motorista');
        } else {
            alert("Credenciais inválidas");
        }

    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="senha">Senha:</label>
                    <input
                        type='password'
                        id="senha"
                        name="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;