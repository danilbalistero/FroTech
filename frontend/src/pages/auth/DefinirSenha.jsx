import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as usuarioService from '../../service/usuarioService';
import '../comum/Auth.css';
import Modal from '../../components/Modal/Modal'; 

const DefinirSenha = () => {
    const [novaSenha, setNovaSenha] = useState('');
    const navigate = useNavigate();

    const [modalAviso, setModalAviso] = useState({
        isOpen: false,
        titulo: '',
        mensagem: '',
        onConfirm: null 
    });

    const showAlert = (titulo, mensagem, onConfirmCallback = null) => {
        setModalAviso({
            isOpen: true,
            titulo,
            mensagem,
            onConfirm: onConfirmCallback
        });
    };

    const handleCloseAviso = () => {
        const callback = modalAviso.onConfirm;
        setModalAviso({ isOpen: false, titulo: '', mensagem: '', onConfirm: null });
        if (callback) {
            callback(); 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (novaSenha.length < 6) {
            showAlert('Atenção', 'A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        try {
            await usuarioService.definirNovaSenha({ novaSenha });

            showAlert('Sucesso', 'Senha definida com sucesso! Você será redirecionado para fazer o login.', () => {
                localStorage.removeItem('authToken');
                localStorage.removeItem('userRole');
                navigate('/');
            });

        } catch (error) {
            console.error('Erro ao definir senha:', error);
            showAlert('Erro', `Não foi possível definir a nova senha: ${error.message}`);
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

            <Modal isOpen={modalAviso.isOpen} onClose={handleCloseAviso}>
                <div>
                    <h2>{modalAviso.titulo}</h2>
                    <p>{modalAviso.mensagem}</p>
                    <div className="botoes-modal">
                        <button type="button" onClick={handleCloseAviso}>
                            OK
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DefinirSenha;