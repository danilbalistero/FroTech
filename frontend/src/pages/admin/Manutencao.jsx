import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import ManutencaoCard from '../../components/Card/ManutencaoCard'
import './Manutencao.css';
import Paginacao from '../../components/Paginacao';

const manutencoesSimuladas = [
    {
        id: 1,
        placaVeiculo: 'ABC1D23',
        modeloVeiculo: 'Corolla',
        tipo: 'Preventiva',
        descricao: 'Troca de óleo e filtros',
        dataAgendada: '2025-09-15',
        status: 'ABERTA'
    },
    {
        id: 2,
        placaVeiculo: 'XYZ4E56',
        modeloVeiculo: 'Onix',
        tipo: 'Corretiva',
        descricao: 'Conserto no freio',
        dataAgendada: '2025-09-10',
        dataRealizada: '2025-09-10',
        custo: 150.00,
        status: 'CONCLUIDA'
    },
    {
        id: 3,
        placaVeiculo: 'FGH7I89',
        modeloVeiculo: 'Gol',
        tipo: 'Preventiva',
        descricao: 'Substituição de correia dentada',
        dataAgendada: '2025-09-08',
        status: 'ATRASADA'
    },
    {
        id: 4,
        placaVeiculo: 'ZTE6K62',
        modeloVeiculo: 'Mobi',
        tipo: 'Preventiva',
        descricao: 'Troca de óleo e filtros',
        dataAgendada: '2025-09-15',
        status: 'AGENDADA',
    },
    {
        id: 5,
        placaVeiculo: 'JKL9M12',
        modeloVeiculo: 'Compass',
        tipo: 'Corretiva',
        descricao: 'Reparo no ar-condicionado',
        dataAgendada: '2025-09-20',
        status: 'ANDAMENTO',
    },
    {
        id: 6,
        placaVeiculo: 'GHI3J45',
        modeloVeiculo: 'Renegade',
        tipo: 'Preventiva',
        descricao: 'Revisão geral',
        motivoCancelamento: 'Veiculo vendido',
        status: 'CANCELADA',
    },
];

// Supondo que você tenha uma lista de veículos cadastrados em outro lugar,
// ou que possamos extraí-los da lista de manutenções simuladas.
// Vamos criar uma lista de veículos únicos. 
const veiculosCadastrados = [
    { placa: 'ABC1D23', modelo: 'Corolla' },
    { placa: 'XYZ4E56', modelo: 'Onix' },
    { placa: 'FGH7I89', modelo: 'Gol' },
    { placa: 'ZTE6K62', modelo: 'Mobi' },
    { placa: 'JKL9M12', modelo: 'Compass' },
    { placa: 'GHI3J45', modelo: 'Renegade' },
];

const Manutencao = () => {
    const [manutencoes, setManutencoes] = useState([]);
    const [modal, setModal] = useState({ isOpen: false, modo: '', data: null });
    const [novaManutencao, setNovaManutencao] = useState({
        placaVeiculo: '', modeloVeiculo: '', tipo: '', descricao: '', dataAgendada: '', dataRealizada: '', status: ''
    });

    //filtro
    const [filtroVeiculo, setFiltroVeiculo] = useState('');
    const [filtroStatus, setFiltroStatus] = useState('');

    // 1. PRIMEIRO: Aplicamos os filtros na lista principal de manutenções
    const manutencoesFiltradas = manutencoes.filter(manutencao => {
        const veiculoCorresponde = filtroVeiculo ? manutencao.placaVeiculo === filtroVeiculo : true;
        const statusCorresponde = filtroStatus ? manutencao.status === filtroStatus : true;
        return veiculoCorresponde && statusCorresponde;
    });

    //paginação
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
        const manutencoesSalvas = JSON.parse(localStorage.getItem('manutencoes'));
        if (manutencoesSalvas && manutencoesSalvas.length > 0) {
            setManutencoes(manutencoesSalvas);
        } else {
            localStorage.setItem('manutencoes', JSON.stringify(manutencoesSimuladas));
            setManutencoes(manutencoesSimuladas);
        }
    }, []);

    const handleOpenModal = (modo, data = null) => {
        setNovaManutencao({
            placaVeiculo: '', modeloVeiculo: '', tipo: '', descricao: '', dataAgendada: '', dataRealizada: '', status: ''
        });
        setModal({ isOpen: true, modo, data });
    }

    const handleCloseModal = () => {
        setModal({ isOpen: false, modo: '', data: null });
        setNovaManutencao({
            placaVeiculo: '', modeloVeiculo: '', tipo: '', descricao: '', dataAgendada: '', dataRealizada: '', status: ''
        });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'veiculo') {
            const [placaVeiculo, modeloVeiculo] = value.split('|');
            setNovaManutencao({ ...novaManutencao, placaVeiculo, modeloVeiculo });
        } else {
            setNovaManutencao({ ...novaManutencao, [name]: value });
        }
    };

    const handleAgendar = (manutencao) => {
        setNovaManutencao(manutencao);
        handleOpenModal('agendar', manutencao);
    }

    const handleConcluir = (manutencao) => {
        setNovaManutencao(manutencao);
        handleOpenModal('concluir', manutencao);
    }

    const handleCancelar = (manutencao) => {
        setNovaManutencao(manutencao);
        handleOpenModal('cancelar', manutencao);
    }

    const handleIniciar = (manutencao) => {
        const listaAtualizada = manutencoes.map(m =>
            m.id === manutencao.id ? { ...m, status: 'ANDAMENTO' } : m
        );
        setManutencoes(listaAtualizada);
        localStorage.setItem('manutencoes', JSON.stringify(listaAtualizada));
    };

    const handleDetalhes = (manutencao) => {
        handleOpenModal('verDetalhes', manutencao);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let listaAtualizada = [];

        switch (modal.modo) {
            case 'cadastro':
                const novoId = manutencoes.length > 0 ? manutencoes[manutencoes.length - 1].id + 1 : 1;
                const novaManutencaoComId = { ...novaManutencao, id: novoId, status: 'ABERTA' };
                listaAtualizada = [...manutencoes, novaManutencaoComId];
                break;
            case 'agendar':
                listaAtualizada = manutencoes.map(m =>
                    m.id === modal.data.id ? { ...m, dataAgendada: novaManutencao.dataAgendada, status: 'AGENDADA' } : m
                );
                break;
            case 'concluir':
                listaAtualizada = manutencoes.map(m =>
                    m.id === modal.data.id ? { ...m, dataRealizada: novaManutencao.dataRealizada, custo: parseFloat(novaManutencao.custo), status: 'CONCLUIDA' } : m
                );
                break;
            case 'cancelar':
                listaAtualizada = manutencoes.map(m =>
                    m.id === modal.data.id ? { ...m, motivoCancelamento: novaManutencao.motivoCancelamento, status: 'CANCELADA' } : m
                );
                break;
            default:
                break;
        }

        setManutencoes(listaAtualizada);
        localStorage.setItem('manutencoes', JSON.stringify(listaAtualizada));
        handleCloseModal();
    };

    return (
        <div>
            <div className='header-conteudo'>
                <h1>Gerenciar Manutenções</h1>

                <div className='filtros-container'>

                    <select value={filtroVeiculo}
                        onChange={(e) => setFiltroVeiculo(e.target.value)}
                    >
                        <option value=''>Todos os Veículos</option>
                        {veiculosCadastrados.map((veiculo, index) => (
                            <option key={index} value={veiculo.placa}>
                                {veiculo.modelo} - {veiculo.placa}
                            </option>
                        ))}
                    </select>

                    <select value={filtroStatus}
                        onChange={(e) => setFiltroStatus(e.target.value)}
                    >
                        <option value=''>Todos os Status</option>
                        <option value='ABERTA'>Aberta</option>
                        <option value='AGENDADA'>Agendada</option>
                        <option value='ANDAMENTO'>Em Andamento</option>
                        <option value='CONCLUIDA'>Concluída</option>
                        <option value='ATRASADA'>Atrasada</option>
                        <option value='CANCELADA'>Cancelada</option>
                    </select>

                </div>

                <button className='nova-manutencao-btn' onClick={() => handleOpenModal('cadastro')}>
                    Nova Manutenção
                </button>
            </div>

            <div className="manutencao-cards-container">
                {itensPaginaAtual.map((manutencao) => (
                    <ManutencaoCard
                        key={manutencao.id}
                        manutencao={manutencao}
                        onVerDetalhes={handleDetalhes}
                        onAgendar={handleAgendar}
                        onIniciar={handleIniciar}
                        onConcluir={handleConcluir}
                        onCancelar={handleCancelar}
                    />
                ))}
            </div>

            <Paginacao
                itensPorPagina={itensPorPagina}
                totalItens={manutencoesFiltradas.length}
                mudarPagina={mudarPagina}
                paginaAtual={paginaAtual}
            />

            <Modal isOpen={modal.isOpen} onClose={handleCloseModal}>
                {modal.modo === 'verDetalhes' && (
                    <div className="detalhes-modal">
                        <h2>Detalhes da Manutenção</h2>
                        <p><strong>Placa do Veículo:</strong> {modal.data.placaVeiculo}</p>
                        <p><strong>Modelo do Veículo:</strong> {modal.data.modeloVeiculo}</p>
                        <p><strong>Tipo:</strong> {modal.data.tipo}</p>
                        <p><strong>Descrição:</strong> {modal.data.descricao}</p>
                        <p><strong>Status:</strong> {modal.data.status}</p>
                        {modal.data.dataAgendada && <p><strong>Data Agendada:</strong> {modal.data.dataAgendada}</p>}
                        {modal.data.dataRealizada && <p><strong>Data Realizada:</strong> {modal.data.dataRealizada}</p>}
                        {modal.data.custo && <p><strong>Custo:</strong> R$ {modal.data.custo.toFixed(2)}</p>}
                        {modal.data.motivoCancelamento && <p><strong>Motivo do Cancelamento:</strong> {modal.data.motivoCancelamento}</p>}

                        <div className="botoes-modal">
                            <button onClick={handleCloseModal}>Fechar</button>
                        </div>
                    </div>
                )}


                {modal.modo === 'agendar' && (
                    <form onSubmit={handleSubmit}>
                        <h2>Agendar Manutenção</h2>
                        <p>Manutenção: **{modal.data.descricao}**</p>
                        <p>Veículo: **{modal.data.modeloVeiculo} - {modal.data.placaVeiculo}**</p>
                        <label>Data Agendada:</label>
                        <input type="date" name="dataAgendada" value={novaManutencao.dataAgendada} onChange={handleInputChange} required />
                        <div className="botoes-modal">
                            <button type="submit">Agendar</button>
                            <button type="button" onClick={handleCloseModal}>Cancelar</button>
                        </div>
                    </form>
                )}

                {modal.modo === 'concluir' && (
                    <form onSubmit={handleSubmit}>
                        <h2>Concluir Manutenção</h2>
                        <p>Manutenção: {modal.data.descricao}</p>
                        <br />
                        <label>Data de Conclusão:</label>
                        <input type="date" name="dataRealizada" value={novaManutencao.dataRealizada} onChange={handleInputChange} required />
                        <label>Custo:</label>
                        <input type="number" name="custo" value={novaManutencao.custo} onChange={handleInputChange} required />
                        <div className="botoes-modal">
                            <button type="submit">Concluir</button>
                            <button type="button" onClick={handleCloseModal}>Cancelar</button>
                        </div>
                    </form>
                )}

                {modal.modo === 'cancelar' && (
                    <form onSubmit={handleSubmit}>
                        <h2>Cancelar Manutenção</h2>
                        <p>Tem certeza que deseja cancelar a manutenção?</p>
                        <br />
                        <label>Motivo do Cancelamento:</label>
                        <textarea className="descricao-textarea" name="motivoCancelamento" value={novaManutencao.motivoCancelamento} onChange={handleInputChange} required />
                        <div className="botoes-modal">
                            <button type="submit">Confirmar Cancelamento</button>
                            <button type="button" onClick={handleCloseModal}>Voltar</button>
                        </div>
                    </form>
                )}

                {modal.modo === 'cadastro' && (
                    <form onSubmit={handleSubmit}>
                        <h2>Adicionar Nova Manutenção</h2>
                        <label>Veículo:</label>
                        <select name="veiculo" value={`${novaManutencao.placaVeiculo}|${novaManutencao.modeloVeiculo}`} onChange={handleInputChange} required>
                            <option value="">Selecione o veículo</option>
                            {veiculosCadastrados.map((veiculo, index) => (
                                <option key={index} value={`${veiculo.placa}|${veiculo.modelo}`}>
                                    {veiculo.modelo} - {veiculo.placa}
                                </option>
                            ))}
                        </select>
                        <label>Tipo:</label>
                        <select name="tipo" value={novaManutencao.tipo} onChange={handleInputChange} required>
                            <option value="">Selecione</option>
                            <option value="Preventiva">Preventiva</option>
                            <option value="Corretiva">Corretiva</option>
                        </select>
                        <label>Descrição:</label>
                        <textarea className="descricao-textarea" name="descricao" value={novaManutencao.descricao} onChange={handleInputChange} required />
                        <div className="botoes-modal">
                            <button type="submit">Adicionar</button>
                            <button type="button" onClick={handleCloseModal}>Cancelar</button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default Manutencao;