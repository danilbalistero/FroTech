import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as usuarioService from '../../service/usuarioService';
import '../comum/Auth.css';

const DefinirSenha = () => {
    const [novaSenha, setNovaSenha] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (novaSenha.length < 6) {
            alert('A senha deve ter no minimo 6 caracteres');
            return;
        }

        try {
            await usuarioService.definirNovaSenha({ novaSenha });

            alert('Senha definida com sucesso! Você será redirecionado para fazer o login.');

            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');

            navigate('/');


        } catch (error) {
            console.error('Erro ao definir senha:', error);
            alert(`Não foi possível definir a nova senha: ${error.message}`);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h1>Crie sua Nova Senha</h1>
                <p>Por segurança, você precisa definir uma nova senha para o seu primeiro acesso.</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="novaSenha">Nova Senha:</label>
                        <input
                            type="password"
                            id="novaSenha"
                            value={novaSenha}
                            onChange={(e) => setNovaSenha(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>
                    <button type="submit">Salvar Nova Senha</button>
                </form>
            </div>
        </div>
    );
};

export default DefinirSenha;