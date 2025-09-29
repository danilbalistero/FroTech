import React from 'react';
import { FaEye, FaPlay, FaCheckSquare, FaCalendarDay, FaTrashAlt } from 'react-icons/fa';
import './ManutencaoCard.css';

const ManutencaoCard = ({ manutencao, onVerDetalhes, onAgendar, onConcluir, onCancelar, onIniciar }) => {

    const handleActionClick = (action, manutencao) => {
        if (action === 'agendar') {
            onAgendar(manutencao);
        } else if (action === 'iniciar') {
            onIniciar(manutencao);
        } else if (action === 'concluir') {
            onConcluir(manutencao);
        } else if (action === 'cancelar') {
            onCancelar(manutencao);
        }
    };

    return (
        <div className={`manutencao-card ${manutencao.status.toLowerCase()}`}>

            <div className="card-header-status">
                <span className="card-tipo">{manutencao.tipo}</span>
                <span className={`card-status status-${manutencao.status.toLowerCase()}`}>{manutencao.status}</span>
            </div>

            <div className="card-conteudo">
                <h4>{manutencao.modeloVeiculo} - {manutencao.placaVeiculo}</h4>
                <p>Descrição: {manutencao.descricao}</p>
            </div>

            <div className="card-footer-acoes">
                <FaEye
                    className="acao-icon"
                    title="Ver Detalhes"
                    onClick={() => onVerDetalhes(manutencao)}
                />

                {manutencao.status === 'ABERTA' && (
                    <FaCalendarDay
                        className='acao-icon'
                        title='Agendar'
                        onClick={() => handleActionClick('agendar', manutencao)}
                    />
                )}

                {['AGENDADA', 'ATRASADA'].includes(manutencao.status) && (
                    <FaPlay
                        className='acao-icon'
                        title='Iniciar'
                        onClick={() => handleActionClick('iniciar', manutencao)}
                    />
                )}

                {manutencao.status === 'ANDAMENTO' && (
                    <FaCheckSquare
                        className="acao-icon"
                        title="Concluir"
                        onClick={() => handleActionClick('concluir', manutencao)}
                    />
                )}

                {['ABERTA', 'AGENDADA', 'ATRASADA'].includes(manutencao.status) && (
                    <FaTrashAlt
                        className="acao-icon"
                        title="Cancelar"
                        onClick={() => handleActionClick('cancelar', manutencao)}
                    />
                )}
            </div>
        </div>
    );
};

export default ManutencaoCard;