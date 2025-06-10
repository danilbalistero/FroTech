import { useEffect, useState } from 'react';
import './Usuarios.css';
import ModalCadastroUsuario from '../components/ModalCadastroUsuario';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [modalAberta, setModalAberta] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState({ nome: '', email: '', senha: '', role: '' });

  const carregarUsuarios = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/usuario', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error('Erro ao buscar usuários:', err));
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  function abrirModalCriacao() {
    setUsuarioEditando({ nome: '', email: '', senha: '', role: '' });
    setModoEdicao(false);
    setModalAberta(true);
  }

  function abrirModalEdicao(usuario) {
    setUsuarioEditando(usuario);
    setModoEdicao(true);
    setModalAberta(true);
  }

  function fecharModal() {
    setModalAberta(false);
    setUsuarioEditando({ nome: '', email: '', senha: '', role: '' });
  }

  async function excluirUsuario(id) {
    const token = localStorage.getItem('token');
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      await fetch(`http://localhost:8080/usuario/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      carregarUsuarios(); 
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const url = modoEdicao
      ? `http://localhost:8080/usuario/${usuarioEditando.id}`
      : 'http://localhost:8080/usuario';

    const method = modoEdicao ? 'PUT' : 'POST';

    const body = {
      nome: usuarioEditando.nome,
      email: usuarioEditando.email,
      senha: usuarioEditando.senha,
      role: usuarioEditando.role
    };

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      fecharModal();
      carregarUsuarios(); 
    } else {
      alert('Erro ao salvar usuário.');
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Usuários Cadastrados</h2>
      <button onClick={abrirModalCriacao} style={{ marginBottom: '1rem' }}>
        Cadastrar Novo Usuário
      </button>

      <table border="1" cellPadding="10" style={{ marginTop: '1rem', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Função</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>
                {user.role === 'ROLE_ADMIN'
                  ? 'Administrador'
                  : user.role === 'ROLE_MOTORISTA'
                    ? 'Motorista'
                    : 'Desconhecido'}
              </td>
              <td>
                <button onClick={() => abrirModalEdicao(user)}>Editar</button>
                <button onClick={() => excluirUsuario(user.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalAberta && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{modoEdicao ? 'Editar Usuário' : 'Cadastrar Novo Usuário'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nome"
                value={usuarioEditando.nome}
                onChange={e => setUsuarioEditando({ ...usuarioEditando, nome: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={usuarioEditando.email}
                onChange={e => setUsuarioEditando({ ...usuarioEditando, email: e.target.value })}
                required
              />
              {!modoEdicao && (
                <input
                  type="password"
                  placeholder="Senha"
                  value={usuarioEditando.senha}
                  onChange={e => setUsuarioEditando({ ...usuarioEditando, senha: e.target.value })}
                  required
                />
              )}
              <select
                value={usuarioEditando.role}
                onChange={e => setUsuarioEditando({ ...usuarioEditando, role: e.target.value })}
                required
              >
                <option value="">Selecione a função</option>
                <option value="ADMIN">Administrador</option>
                <option value="MOTORISTA">Motorista</option>
              </select>
              <button type="submit">{modoEdicao ? 'Salvar Alterações' : 'Cadastrar'}</button>
              <button type="button" onClick={fecharModal}>Cancelar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
