import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import ManutencaoCard from '../../components/Card/ManutencaoCard'
import './Manutencao.css';
import Paginacao from '../../components/Paginacao';
import { listarManutencoes, registrarManutencao, agendarManutencao, iniciarManutencao, concluirManutencao, cancelarManutencao } from '../../service/manutencaoService';
import { listarVeiculos } from '../../service/veiculoService';

const Manutencao = () => {
    const [manutencoes, setManutencoes] = useState([]);
    const [modal, setModal] = useState({ isOpen: false, modo: '', data: null });
    const [novaManutencao, setNovaManutencao] = useState({
        placaVeiculo: '', modeloVeiculo: '', tipo: '', descricao: '', dataAgendada: '', dataRealizada: '', status: ''
    });
    const [filtroVeiculo, setFiltroVeiculo] = useState('');
    const [filtroStatus, setFiltroStatus] = useState('');
    const [veiculos, setVeiculos] = useState([]);

    const manutencoesFiltradas = manutencoes.filter(manutencao => {
        const veiculoCorresponde = filtroVeiculo ? manutencao.veiculo && manutencao.veiculo.placa === filtroVeiculo : true;
        const statusCorresponde = filtroStatus ? manutencao.status === filtroStatus : true;
        return veiculoCorresponde && statusCorresponde;
    });

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [itensPorPagina] = useState(8);
    const indiceUltimoItem = paginaAtual * itensPorPagina;
    const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
    const itensPaginaAtual = manutencoesFiltradas.slice(indicePrimeiroItem, indiceUltimoItem);
    const mudarPagina = (numeroDaPag) => setPaginaAtual(numeroDaPag);

    useEffect(() => {
        setPaginaAtual(1);
    }, [filtroVeiculo, filtroStatus]);

    useEffect(() => {
        const carregarDadosIniciais = async () => {
            try {
                const dataManutencoes = await listarManutencoes();
                setManutencoes(dataManutencoes);
                const dataVeiculos = await listarVeiculos();
                setVeiculos(dataVeiculos);
            } catch (error) {
                console.error("Erro ao carregar dados iniciais:", error);
            }
        };
        carregarDadosIniciais();
    }, []);

    const buscarApenasManutencoes = async () => {
        try {
            const data = await listarManutencoes();
            setManutencoes(data);
        } catch (error) {
            console.error('Erro ao buscar as manutenções:', error);
        }
    }

    const handleIniciar = async (manutencao) => {
        try {
            await iniciarManutencao(manutencao.id);
            await buscarApenasManutencoes();
        } catch (error) {
            console.error('Erro ao iniciar manutenção:', error);
        }
    }

    const handleOpenModal = (modo, data = null) => {
        setNovaManutencao(data || { placaVeiculo: '', tipo: '', descricao: '' });
        setModal({ isOpen: true, modo, data });
    }

    const handleCloseModal = () => {
        setModal({ isOpen: false, modo: '', data: null });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'veiculo') {
            setNovaManutencao({ ...novaManutencao, placaVeiculo: value });
        } else {
            setNovaManutencao({ ...novaManutencao, [name]: value });
        }
    };

    const handleAgendar = (manutencao) => { handleOpenModal('agendar', manutencao); }
    const handleConcluir = (manutencao) => { handleOpenModal('concluir', manutencao); }
    const handleCancelar = (manutencao) => { handleOpenModal('cancelar', manutencao); }
    const handleDetalhes = (manutencao) => { handleOpenModal('verDetalhes', manutencao); }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            switch (modal.modo) {
                case 'cadastro': {
                    const dadosCadastro = { veiculo: { id: novaManutencao.placaVeiculo }, tipoManutencao: novaManutencao.tipo, descricao: novaManutencao.descricao };
                    await registrarManutencao(dadosCadastro);
                    break;
                }
                case 'agendar': {
                    const dadosAgendamento = { dataAgendada: novaManutencao.dataAgendada };
                    await agendarManutencao(modal.data.id, dadosAgendamento);
                    break;
                }
                case 'concluir': {
                    const dadosConclusao = { dataRealizada: novaManutencao.dataRealizada, custo: parseFloat(novaManutencao.custo) }
                    await concluirManutencao(modal.data.id, dadosConclusao);
                    break;
                }
                case 'cancelar': {
                    const dadosCancelamento = { motivoCancelamento: novaManutencao.motivoCancelamento, dataCancelamento: new Date().toISOString().split('T')[0] }
                    await cancelarManutencao(modal.data.id, dadosCancelamento);
                    break;
                }
                default:
                    break;
            }
            await buscarApenasManutencoes();
            handleCloseModal();
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
        }
    };

    return (
        <div>
            <div className='header-conteudo'>
                <h1>Gerenciar Manutenções</h1>
                <div className='filtros-container'>
                    <select value={filtroVeiculo} onChange={(e) => setFiltroVeiculo(e.target.value)}>
                        <option value=''>Todos os Veículos</option>
                        {veiculos.map((veiculo) => (<option key={veiculo.id} value={veiculo.placa}>{veiculo.modelo} - {veiculo.placa}</option>))}
                    </select>
                    <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
                        <option value=''>Todos os Status</option>
                        <option value='ABERTA'>Aberta</option><option value='AGENDADA'>Agendada</option><option value='ANDAMENTO'>Em Andamento</option><option value='CONCLUIDA'>Concluída</option><option value='ATRASADA'>Atrasada</option><option value='CANCELADA'>Cancelada</option>
                    </select>
                </div>
                <button className='nova-manutencao-btn' onClick={() => handleOpenModal('cadastro')}>Nova Manutenção</button>
            </div>
            <div className="manutencao-cards-container">
                {itensPaginaAtual.map((manutencao) => (<ManutencaoCard key={manutencao.id} manutencao={manutencao} onVerDetalhes={handleDetalhes} onAgendar={handleAgendar} onIniciar={handleIniciar} onConcluir={handleConcluir} onCancelar={handleCancelar} />))}
            </div>
            <Paginacao itensPorPagina={itensPorPagina} totalItens={manutencoesFiltradas.length} mudarPagina={mudarPagina} paginaAtual={paginaAtual} />

            <Modal isOpen={modal.isOpen} onClose={handleCloseModal}>
                {modal.modo === 'verDetalhes' && modal.data && (
                    <div className="detalhes-modal">
                        <h2>Detalhes da Manutenção</h2>
                        <p><strong>Placa do Veículo:</strong> {modal.data.veiculo?.placa}</p>
                        <p><strong>Modelo do Veículo:</strong> {modal.data.veiculo?.modelo}</p>
                        <p><strong>Tipo:</strong> {modal.data.tipoManutencao?.replace("_", " ")}</p>
                        <p><strong>Descrição:</strong> {modal.data.descricao}</p>
                        <p><strong>Status:</strong> {modal.data.status}</p>
                        {modal.data.dataAgendada && <p><strong>Data Agendada:</strong> {modal.data.dataAgendada}</p>}
                        {modal.data.dataRealizada && <p><strong>Data Realizada:</strong> {modal.data.dataRealizada}</p>}
                        {modal.data.custo && <p><strong>Custo:</strong> R$ {modal.data.custo.toFixed(2)}</p>}
                        {modal.data.motivoCancelamento && <p><strong>Motivo do Cancelamento:</strong> {modal.data.motivoCancelamento}</p>}
                        <div className="botoes-modal"><button onClick={handleCloseModal}>Fechar</button></div>
                    </div>
                )}

                {modal.modo === 'agendar' && (
                    <form onSubmit={handleSubmit}>
                        <h2>Agendar Manutenção</h2>
                        <p>Manutenção: <strong>{modal.data.descricao}</strong></p>
                        <p>Veículo: <strong>{modal.data.veiculo?.modelo} - {modal.data.veiculo?.placa}</strong></p>
                        <label>Data Agendada:</label>
                        <input type="date" name="dataAgendada" value={novaManutencao.dataAgendada || ''} onChange={handleInputChange} required />
                        <div className="botoes-modal"><button type="submit">Agendar</button><button type="button" onClick={handleCloseModal}>Cancelar</button></div>
                    </form>
                )}

                {modal.modo === 'concluir' && (
                    <form onSubmit={handleSubmit}>
                        <h2>Concluir Manutenção</h2>
                        <p>Manutenção: {modal.data.descricao}</p><br />
                        <label>Data de Conclusão:</label>
                        <input type="date" name="dataRealizada" value={novaManutencao.dataRealizada || ''} onChange={handleInputChange} required />
                        <label>Custo:</label>
                        <input type="number" name="custo" value={novaManutencao.custo || ''} onChange={handleInputChange} required />
                        <div className="botoes-modal"><button type="submit">Concluir</button><button type="button" onClick={handleCloseModal}>Cancelar</button></div>
                    </form>
                )}

                {modal.modo === 'cancelar' && (
                    <form onSubmit={handleSubmit}>
                        <h2>Cancelar Manutenção</h2>
                        <p>Tem certeza que deseja cancelar a manutenção?</p><br />
                        <label>Motivo do Cancelamento:</label>
                        <textarea className="descricao-textarea" name="motivoCancelamento" value={novaManutencao.motivoCancelamento || ''} onChange={handleInputChange} required />
                        <div className="botoes-modal"><button type="submit">Confirmar Cancelamento</button><button type="button" onClick={handleCloseModal}>Voltar</button></div>
                    </form>
                )}

                {modal.modo === 'cadastro' && (
                    <form onSubmit={handleSubmit}>
                        <h2>Adicionar Nova Manutenção</h2>
                        <label>Veículo:</label>
                        <select name="veiculo" value={novaManutencao.placaVeiculo} onChange={handleInputChange} required>
                            <option value="">Selecione o veículo</option>
                            {veiculos.map((veiculo) => (<option key={veiculo.id} value={veiculo.id}>{veiculo.modelo} - {veiculo.placa}</option>))}
                        </select>
                        <label>Tipo:</label>
                        <select name="tipo" value={novaManutencao.tipo} onChange={handleInputChange} required>
                            <option value="">Selecione</option>
                            <option value="PREVENTIVA">Preventiva</option>
                            <option value="CORRETIVA">Corretiva</option>
                        </select>
                        <label>Descrição:</label>
                        <textarea className="descricao-textarea" name="descricao" value={novaManutencao.descricao} onChange={handleInputChange} required />
                        <div className="botoes-modal"><button type="submit">Adicionar</button><button type="button" onClick={handleCloseModal}>Cancelar</button></div>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default Manutencao;