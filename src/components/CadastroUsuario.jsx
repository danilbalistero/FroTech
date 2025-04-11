import { useState } from 'react';
import './CadastroUsuario.css';

export default function CadastroUsuario() {
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    senha: '',
  });
  
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });
      
      if (response.ok) {
        const data = await response.json();
        setMensagem('Usuário cadastrado com sucesso!');
        setTipoMensagem('success');
        setUsuario({
          nome: '',
          email: '',
          senha: '',
        });
      } else {
        const error = await response.json();
        setMensagem(`Erro ao cadastrar: ${error.message || 'Tente novamente'}`);
        setTipoMensagem('error');
      }
    } catch (error) {
      setMensagem('Erro de conexão com o servidor');
      setTipoMensagem('error');
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <div className="cadastro-header">
          <h2>Cadastro de Usuário</h2>
        </div>
        
        {mensagem && (
          <div className={`mensagem ${tipoMensagem}`}>
            {mensagem}
          </div>
        )}
        
        <form className="cadastro-form" onSubmit={handleSubmit}>
          <div className="form-fields">
            <div className="form-group">
              <label htmlFor="nome">Nome Completo</label>
              <input
                id="nome"
                name="nome"
                type="text"
                required
                value={usuario.nome}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={usuario.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                name="senha"
                type="password"
                required
                value={usuario.senha}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn-cadastrar">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}