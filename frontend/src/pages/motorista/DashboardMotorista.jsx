import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaClipboardList, FaGasPump, FaKey } from "react-icons/fa";
import { buscarVeiculoEmUso } from '../../service/usuarioService';
import { devolverVeiculo } from '../../service/veiculoService';
import Modal from '../../components/Modal/Modal'; 
import './DashboardMotorista.css';

const DashboardMotorista = () => {
    const [veiculoEmUso, setVeiculoEmUso] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const verificarVeiculo = async () => {
            try {
                const veiculo = await buscarVeiculoEmUso();
                setVeiculoEmUso(veiculo); 
            } catch (error) {
                console.error("Não foi possível verificar o veículo em uso", error);
            }
        };
        verificarVeiculo();
    }, []); 

    const handleDevolver = async () => {
        if (!veiculoEmUso) return;

        try {
            await devolverVeiculo(veiculoEmUso.id);
            alert(`Veículo ${veiculoEmUso.placa} devolvido com sucesso!`);
            setVeiculoEmUso(null); 
            setIsModalOpen(false); 
        } catch (error) {
            alert("Falha ao devolver o veículo. Tente novamente.");
        }
    };

    const handleNavigateAbastecimento = () => {
        if (!veiculoEmUso) {
            alert("Você precisa estar em uma jornada para registrar um abastecimento. Realize o checklist primeiro.");
            return;
        }
        navigate(`/motorista/abastecimentos?veiculoId=${veiculoEmUso.id}&placa=${veiculoEmUso.placa}`);
    };

    return (
        <div className="dashboard-motorista">
            <div className="dashboard-cards-container">
                {veiculoEmUso ? (
                    <div className="dashboard-card" onClick={() => setIsModalOpen(true)}>
                        <FaKey size={40} />
                        <span>Finalizar Jornada (Veículo {veiculoEmUso.placa})</span>
                    </div>
                ) : (
                    <Link to="/motorista/checklist" className="dashboard-card">
                        <FaClipboardList size={40} />
                        <span>Realizar Checklist</span>
                    </Link>
                )}

                <div className="dashboard-card" onClick={handleNavigateAbastecimento}>
                    <FaGasPump size={40} />
                    <span>Registrar Abastecimento</span>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Finalizar Jornada</h2>
                <p>Deseja mesmo finalizar a jornada com o veículo {veiculoEmUso?.placa}?</p>
                <div className='botoes-modal'>
                    <button onClick={handleDevolver}>Sim, finalizar</button>
                    <button onClick={() => setIsModalOpen(false)}>Não</button>
                </div>
            </Modal>

                        {/* 
            <section className="atividades-recentes">
                <h2>Atividades Recentes</h2>
                <ul className="atvidades-list">
                    <li className="atividades-item">Checklist realizado no Veículo X - 14/10/2025</li>
                    <li className="atividades-item">Abastecimento (32.8L) registrado - 13/10/2025</li>
                    <li className="atividades-item">Jornada finalizada - 12/10/2025</li>
                </ul>
            </section>
            */}

        </div>
    );
};

export default DashboardMotorista;
