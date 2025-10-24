import React, { useEffect, useState } from 'react';
import { listarVeiculos, cadastrarVeiculo, editarVeiculo, inativarVeiculo, listarVeiculosInativos, recuperarVeiculo } from '../../service/veiculoService';
import { IMaskInput } from 'react-imask';
import Modal from '../../components/Modal/Modal';
import './Veiculo.css';

const Veiculo = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, modo: '', data: null });
  const [novoVeiculo, setNovoVeiculo] = useState({ placa: '', modelo: '', marca: '', ano: '', kmAtual: '', status: 'DISPONIVEL' });
  const [mostrandoInativos, setMostrandoInativos] = useState(false);
  const anoAtual = new Date().getFullYear();
  const anoMaximo = anoAtual + 1;

  const [modalAviso, setModalAviso] = useState({
    isOpen: false,
    titulo: '',
    mensagem: '',
    onConfirm: null,
    isConfirmation: false
  });

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const veiculos = await listarVeiculos();
        setVeiculos(veiculos);
      } catch (error) {
        console.error('Erro ao buscar veículos:', error);
        showAlert('Erro', 'Não foi possível carregar os veículos. Tente novamente.');
      }
    };

    buscarDados();
  }, []);

  const showAlert = (titulo, mensagem, onConfirmCallback = null) => {
    setModalAviso({ isOpen: true, titulo, mensagem, onConfirm: onConfirmCallback, isConfirmation: false });
  };

  const showConfirm = (titulo, mensagem, onConfirmCallback) => {
    setModalAviso({ isOpen: true, titulo, mensagem, onConfirm: onConfirmCallback, isConfirmation: true });
  };

  const handleCloseAviso = () => {
    setModalAviso({ isOpen: false, titulo: '', mensagem: '', onConfirm: null, isConfirmation: false });
  };

  const handleConfirmAviso = () => {
    if (modalAviso.onConfirm) {
      modalAviso.onConfirm();
    }
    handleCloseAviso();
  };

  const handleOpenModal = (modo, veiculo = null) => {
    if (modo === 'edicao' || modo === 'exclusao') {
      setNovoVeiculo(veiculo);
    } else {
      setNovoVeiculo({ placa: '', modelo: '', marca: '', ano: '', kmAtual: '', status: 'DISPONIVEL' });
    }
    setModal({ isOpen: true, modo: modo, data: veiculo });
  };

  const handleCloseModal = () => {
    setModal({ isOpen: false, modo: '', data: null });
    setNovoVeiculo({ placa: '', modelo: '', marca: '', ano: '', kmAtual: '', status: 'DISPONIVEL' });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoVeiculo({ ...novoVeiculo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const veiculoParaEnviar = {
      ...novoVeiculo,
      ano: parseInt(novoVeiculo.ano),
      kmAtual: parseInt(novoVeiculo.kmAtual),
      capacidadeTanque: parseFloat(novoVeiculo.capacidadeTanque)
    };

    if (modal.modo === 'edicao') {
      try {
        const veiculoAtualizado = await editarVeiculo(modal.data.id, veiculoParaEnviar);
        setVeiculos(veiculos.map(v =>
          v.id === veiculoAtualizado.id ? veiculoAtualizado : v
        ));
        handleCloseModal();
        showAlert('Sucesso', 'Veículo editado com sucesso!');
      } catch (error) {
        console.error('Erro ao editar veiculo:', error);
        showAlert('Erro', 'Não foi possível editar o veículo.');
      }

    } else if (modal.modo === 'cadastro') {
      try {
        const veiculoSalvo = await cadastrarVeiculo(veiculoParaEnviar);
        setVeiculos([...veiculos, veiculoSalvo]);
        handleCloseModal();
        showAlert('Sucesso', 'Veículo cadastrado com sucesso!');
      } catch (error) {
        console.error('Erro ao cadastrar veiculo:', error);
        showAlert('Erro', 'Não foi possível cadastrar o veículo.');
      }
    }
  }

  const handleConfirmarExclusao = async () => {
    const idParaInativar = modal.data.id;
    try {
      await inativarVeiculo(idParaInativar);
      setVeiculos(veiculos.filter(v => v.id !== idParaInativar));
      handleCloseModal();
      showAlert('Sucesso', 'Veículo inativado com sucesso.');
    } catch (error) {
      console.error('Erro ao inativar veiculo:', error);
      handleCloseModal();
      showAlert('Erro', 'Não foi possível inativar o veículo.');
    }
  }

  const handleRecuperar = (id) => {
    showConfirm('Recuperar Veículo', 'Tem certeza que deseja recuperar este veículo?', async () => {
      try {
        await recuperarVeiculo(id)
        setVeiculos(veiculos.filter(v => v.id !== id));
        showAlert('Sucesso', 'Veiculo recuperado com sucesso!');
      } catch (error) {
        console.error('Erro ao recuperar veiculo:', error);
        showAlert('Erro', 'Erro ao recuperar veiculo.');
      }
    });
  }

  const handleAlterarVisao = async () => {
    const novoEstado = !mostrandoInativos;
    setMostrandoInativos(novoEstado);

    try {
      if (novoEstado) {
        const dados = await listarVeiculosInativos();
        setVeiculos(dados);
      } else {
        const dados = await listarVeiculos();
        setVeiculos(dados);
      }
    } catch (error) {
      console.error('Erro ao alternar a visualização dos veiculos:', error);
      showAlert('Erro', 'Não foi possível carregar a lista de veículos.');
    }
  };

  return (
    <div>
      <div className="header-conteudo">
        <h1>Gerenciar Veículos</h1>
        <div className="header-botoes">
          <button className='novo-veiculo-btn' onClick={handleAlterarVisao}>
            {mostrandoInativos ? 'Ver Veículos Ativos' : 'Ver Veículos Inativos'}
          </button>

          {!mostrandoInativos && (
            <button className="novo-veiculo-btn" onClick={() => handleOpenModal('cadastro')}>Adicionar Veículo</button>
          )}
        </div>
      </div>

      <table className="tabela-veiculos">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Ano</th>
            <th>KM</th>
            <th>Capacidade Tanque</th>
            <th>Status</th>
            <th className="col-acoes">Ações</th>
          </tr>
        </thead>

        <tbody>
          {veiculos.map((veiculo) => (
            <tr key={veiculo.id}>
              <td>{veiculo.placa}</td>
              <td>{veiculo.modelo}</td>
              <td>{veiculo.marca}</td>
              <td>{veiculo.ano}</td>
              <td>{veiculo.kmAtual}</td>
              <td>{veiculo.capacidadeTanque}</td>
              <td>{veiculo.status}</td>
              <td className="acoes col-acoes">
                {mostrandoInativos ? (
                  <button className="btn-acao btn-recuperar" onClick={() => handleRecuperar(veiculo.id)}>Recuperar</button>
                ) : (
                  <>
                    <button className="btn-acao btn-editar" onClick={() => handleOpenModal('edicao', veiculo)}>Editar</button>
                    <button className="btn-acao btn-inativar" onClick={() => handleOpenModal('exclusao', veiculo)}>Inativar</button>
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
            <h2>Inativar Veículo</h2>
            <p>Deseja inativar veículo {modal.data?.modelo} placa {modal.data?.placa}?</p>
            <div className='botoes-modal'>
              <button onClick={handleConfirmarExclusao}>Sim</button>
              <button type="button" onClick={handleCloseModal}>Não</button>
            </div>
          </div>
        ) : (
          <div>
            <h2>{modal.modo === 'edicao' ? 'Editar Veículo' : 'Adicionar Veículo'}</h2>
            <form onSubmit={handleSubmit}>
              <label>Placa:</label>
              <IMaskInput
                mask={"aaa0a00"}
                value={novoVeiculo.placa || ''}
                unmask={true}
                onAccept={(value) => handleInputChange({ target: { name: 'placa', value: value.toUpperCase() } })}
                name="placa"
                placeholder="A placa deve seguir o padrão Mercosul: ABC1D23"
                required
              />

              <label>Modelo:</label>
              <input type="text" name="modelo" value={novoVeiculo.modelo || ''} onChange={handleInputChange} required />

              <label>Marca:</label>
              <input type="text" name="marca" value={novoVeiculo.marca || ''} onChange={handleInputChange} required />

              <label>Ano:</label>
              <input
                type="number"
                name="ano"
                value={novoVeiculo.ano || ''}
                onChange={handleInputChange}
                required
                placeholder={`Ex: ${anoAtual}`}
                min="1980"
                max={anoMaximo}
              />

              <label>KM Atual:</label>
              <input type="number" name="kmAtual" value={novoVeiculo.kmAtual || ''} onChange={handleInputChange} required />

              <label>Capacidade do Tanque (L)</label>
              <input type='number' name='capacidadeTanque' value={novoVeiculo.capacidadeTanque || ''} onChange={handleInputChange} required />

              <label>Status:</label>
              <select name="status" value={novoVeiculo.status || 'DISPONIVEL'} onChange={handleInputChange} required>
                <option value="DISPONIVEL">Disponível</option>
                <option value="INDISPONIVEL">Indisponível</option>
                <option value="MANUTENCAO">Em Manutenção</option>
              </select>

              <div className='botoes-modal'>
                <button type='submit'>Salvar</button>
                <button type='button' onClick={handleCloseModal}>Cancelar</button>
              </div>
            </form>
          </div>
        )}
      </Modal >

      <Modal isOpen={modalAviso.isOpen} onClose={handleCloseAviso}>
        <div>
          <h2>{modalAviso.titulo}</h2>
          <p>{modalAviso.mensagem}</p>
          <div className="botoes-modal">
            {modalAviso.isConfirmation && (
              <button type="button" onClick={handleCloseAviso}>
                Cancelar
              </button>
            )}
            <button type="button" onClick={handleConfirmAviso}>
              {modalAviso.isConfirmation ? 'Sim' : 'OK'}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}

export default Veiculo;