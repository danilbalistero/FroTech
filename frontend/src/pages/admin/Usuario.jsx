import React, { useState, useEffect } from 'react';
import Modal from '../../components/Modal/Modal';
import './Usuario.css';

const usuariosSimulados = [
  { id: 1, nome: 'João da Silva', email: 'joao@gmail.com', perfil: 'ADMIN' },
  { id: 2, nome: 'Maria Souza', email: 'maria@gmail.com', perfil: 'MOTORISTA' },
  { id: 3, nome: 'Pedro Almeida', email: 'pedro@gmail.com', perfil: 'MOTORISTA' },
];

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, modo: '', data: null });
  const [novoUsuario, setNovoUsuario] = useState({ nome: '', email: '', perfil: '' });

  useEffect(() => {
    // Carrega a lista do localStorage na inicialização
    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios'));
    if (usuariosSalvos && usuariosSalvos.length > 0) {
      setUsuarios(usuariosSalvos);
    } else {
      // Se não houver, usa os dados simulados e salva no localStorage
      localStorage.setItem('usuarios', JSON.stringify(usuariosSimulados));
      setUsuarios(usuariosSimulados);
    }
  }, []);

  const handleOpenModal = (modo, usuario = null) => {
    if (modo === 'edicao' || modo === 'exclusao') {
      setNovoUsuario(usuario);
    } else {
      setNovoUsuario({ nome: '', email: '', perfil: '' });
    }
    setModal({ isOpen: true, modo: modo, data: usuario });
  };

  const handleCloseModal = () => {
    setModal({ isOpen: false, modo: '', data: null });
    setNovoUsuario({ nome: '', email: '', perfil: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoUsuario({ ...novoUsuario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let listaAtualizada = [];
    if (modal.modo === 'edicao') {
      listaAtualizada = usuarios.map((usuario) =>
        usuario.id === modal.data.id ? { ...novoUsuario, id: usuario.id } : usuario
      );
    } else if (modal.modo === 'cadastro') {
      const novoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
      const usuarioParaAdicionar = { ...novoUsuario, id: novoId };
      listaAtualizada = [...usuarios, usuarioParaAdicionar];
    }

    setUsuarios(listaAtualizada);
    localStorage.setItem('usuarios', JSON.stringify(listaAtualizada));
    handleCloseModal();
  };

  const handleConfirmarExclusao = () => {
    const listaAtualizada = usuarios.filter((usuario) => usuario.id !== modal.data.id);
    setUsuarios(listaAtualizada);
    localStorage.setItem('usuarios', JSON.stringify(listaAtualizada));
    handleCloseModal();
  };

  return (
    <div>
      <div className="header-conteudo">
      <h1>Gerenciamento de Usuários</h1>
      <button className="novo-usuario-btn" onClick={() => handleOpenModal('cadastro')}>Novo Usuário</button>
      </div>

      <table className="tabela-usuarios">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Senha</th>
            <th>Perfil</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.senha}</td>
              <td>{usuario.perfil}</td>
              <td>
                <button onClick={() => handleOpenModal('edicao', usuario)}>Editar</button>
                <button onClick={() => handleOpenModal('exclusao', usuario)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modal.isOpen} onClose={handleCloseModal}>
        {modal.modo === 'exclusao' ? (
          <div>
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir o usuário {modal.data.nome}?</p>
            <div className="botoes-modal">
            <button onClick={handleConfirmarExclusao}>Sim, Excluir</button>
            <button onClick={handleCloseModal}>Cancelar</button>
            </div>
          </div>
        ) : (
          <div>
            <h2>{modal.modo === 'edicao' ? 'Editar Usuário' : 'Cadastro de Usuário'}</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Nome:</label>
                <input type='text' name='nome' required value={novoUsuario.nome} onChange={handleInputChange} />
              </div>
              <div>
                <label>Email:</label>
                <input type='text' name='email' required value={novoUsuario.email} onChange={handleInputChange} />
              </div>
              {modal.modo === 'cadastro' && (
                <div>
                  <label>Senha:</label>
                  <input type='password' name='senha' required value={novoUsuario.senha} onChange={handleInputChange} />
                </div>
              )}
              <div>
                <label>Perfil:</label>
                <select name="perfil" required value={novoUsuario.perfil} onChange={handleInputChange}>
                  <option value="">Selecione</option>
                  <option value="ADMIN">Administrador</option>
                  <option value="MOTORISTA">Motorista</option>
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