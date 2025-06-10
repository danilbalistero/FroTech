import { useState } from 'react';
import './ModalCadastroUsuario.css';

export default function ModalCadastroUsuario({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    role: 'ADMIN'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:8080/usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    if (response.ok) {
      onSuccess(); 
      onClose();   
    } else {
      alert('Erro ao cadastrar usuário');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Novo Usuário</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} required />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="ADMIN">Administrador</option>
            <option value="MOTORISTA">Motorista</option>
          </select>

          <div className="modal-buttons">
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
