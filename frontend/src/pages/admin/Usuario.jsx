import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal/Modal';
import { listarUsuariosAtivos, listarUsuariosInativos, cadastrarUsuario, editarUsuario, inativarUsuario, recuperarUsuario, resetarSenha } from '../../service/usuarioService';
import './Usuario.css';

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, modo: '', data: null });
  const [novoUsuario, setNovoUsuario] = useState({ nome: '', email: '', role: '' });
  const [mostrandoInativos, setMostrandoInativos] = useState(false);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const data = await listarUsuariosAtivos();
        setUsuarios(data);
      } catch (error) {
        console.error('Erro ao buscar usuarios:', error);
        alert('Erro ao carregar dados');
      }
    };
    buscarDados();
  }, []);

  const handleAlterarVisao = async () => {
    const novoEstado = !mostrandoInativos;
    setMostrandoInativos(novoEstado);

    try {
      if (novoEstado) {
        const dados = await listarUsuariosInativos();
        setUsuarios(dados);
      } else {
        const dados = await listarUsuariosAtivos();
        setUsuarios(dados);
      }
    } catch (error) {
      console.error('Erro ao alternar visualização de usuarios:', error);
    }
  }

  const handleOpenModal = (modo, usuario = null) => {
    if (modo === 'edicao' || modo === 'exclusao') {
      setNovoUsuario(usuario);
    } else {
      setNovoUsuario({ nome: '', email: '', role: '' });
    }
    setModal({ isOpen: true, modo: modo, data: usuario });
  };

  const handleCloseModal = () => {
    setModal({ isOpen: false, modo: '', data: null });
    setNovoUsuario({ nome: '', email: '', role: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoUsuario({ ...novoUsuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (modal.modo === 'cadastro') {
      try {
        const usuarioEnviar = {
          nome: novoUsuario.nome,
          login: novoUsuario.email,
          senha: novoUsuario.senha,
          role: novoUsuario.role
        };
        const usuarioSalvo = await cadastrarUsuario(usuarioEnviar);
        setUsuarios([...usuarios, usuarioSalvo]);

        handleCloseModal();
      } catch (error) {
        console.error('Erro ao cadastrar usuario:', error);
        alert(`Erro ao cadastrar: ${error.message}`);
      }
    } else if (modal.modo === 'edicao') {
      try {
        const usuarioParaEnviar = {
          nome: novoUsuario.nome,
          email: novoUsuario.email,
          role: novoUsuario.role
        };
        const usuarioAtualizado = await editarUsuario(modal.data.id, usuarioParaEnviar);
        setUsuarios(usuarios.map(u => u.id === usuarioAtualizado.id ? usuarioAtualizado : u));

        handleCloseModal();
      } catch (error) {
        console.error('Erro ao editar usuário:', error);
        alert(`Erro ao editar: ${error.message}`);
      }
    }
  };

  const handleConfirmarExclusao = async () => {
    const idParaInativar = modal.data.id;
    try {
      await inativarUsuario(idParaInativar);
      setUsuarios(usuarios.filter(u => u.id !== idParaInativar));
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao inativar usuario:', error);
    }
  };

  const handleRecuperar = async (id) => {
    try {
      await recuperarUsuario(id);
      setUsuarios(usuarios.filter(u => u.id !== id));
    } catch (error) {
      console.error('Erro ao recuperar usuario:', error);
    }
  }

  const formatarRole = (role) => {
    if (role === 'ROLE_ADMIN') {
      return 'Administrador';
    }
    if (role === 'ROLE_MOTORISTA') {
      return 'Motorista';
    }
    return role;
  }

  const handleResetarSenha = async (id) => {
    if (window.confirm('Tem certeza que deseja resetar a senha deste usuário? Uma nova senha temporária será gerada.')) {
      try {
        const senhaTemporaria = await resetarSenha(id);

        alert(`Senha resetada com sucesso! A nova senha temporaria é: ${senhaTemporaria}`);
      } catch (error) {
        console.error('Erro ao resetar senha:', error);
      }
    }
  }

  return (
    <div>
      <div className="header-conteudo">
        <h1>Gerenciar Usuários</h1>
        <div className="header-botoes">
          <button className='novo-usuario-btn' onClick={handleAlterarVisao}>
            {mostrandoInativos ? 'Ver Usuários Ativos' : 'Ver Usuários Inativos'}
          </button>
          {!mostrandoInativos && (
            <button className="novo-usuario-btn" onClick={() => handleOpenModal('cadastro')}>Novo Usuário</button>
          )}
        </div>
      </div>

      <table className="tabela-usuarios">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Perfil</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{formatarRole(usuario.role)}</td>
              <td className="acoes">
                {mostrandoInativos ? (
                  <button className="btn-acao btn-recuperar" onClick={() => handleRecuperar(usuario.id)}>Recuperar</button>
                ) : (
                  <>
                    <button className="btn-acao btn-resetar" onClick={() => handleResetarSenha(usuario.id)}>Resetar Senha</button>
                    <button className="btn-acao btn-editar" onClick={() => handleOpenModal('edicao', usuario)}>Editar</button>
                    <button className="btn-acao btn-inativar" onClick={() => handleOpenModal('exclusao', usuario)}>Inativar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modal.isOpen} onClose={handleCloseModal}>
        {modal.modo === 'exclusao' ? (
          <div>
            <h2>Confirmar Inativação</h2>
            <p>Tem certeza que deseja inativar o usuário {modal.data?.nome}?</p>
            <div className="botoes-modal">
              <button onClick={handleConfirmarExclusao}>Sim, Inativar</button>
              <button onClick={handleCloseModal}>Cancelar</button>
            </div>
          </div>
        ) : (
          <div>
            <h2>{modal.modo === 'edicao' ? 'Editar Usuário' : 'Cadastro de Usuário'}</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Nome:</label>
                <input type='text' name='nome' required value={novoUsuario.nome || ''} onChange={handleInputChange} />
              </div>
              <div>
                <label>Email:</label>
                <input type='email' name='email' required value={novoUsuario.email || ''} onChange={handleInputChange} />
              </div>
              {modal.modo === 'cadastro' && (
                <div>
                  <label>Senha:</label>
                  <input type='password' name='senha' required value={novoUsuario.senha || ''} onChange={handleInputChange} />
                </div>
              )}
              <div>
                <label>Perfil:</label>
                <select name="role" required value={novoUsuario.role || ''} onChange={handleInputChange}>
                  <option value="">Selecione</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="MOTORISTA">MOTORISTA</option>
                </select>
              </div>
              <div className="botoes-modal">
                <button type='submit'>Salvar</button>
                <button type='button' onClick={handleCloseModal}>Cancelar</button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Usuario;