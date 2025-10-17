import React from 'react';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaGasPump } from "react-icons/fa";
import './DashboardMotorista.css';

const DashboardMotorista = () => {

    return (
        <div className="dashboard-motorista">
            <div className="dashboard-cards-container">
                <Link to="/motorista/checklist" className="dashboard-card">
                    <FaClipboardList size={40} />
                    <span>Realizar Checklist</span>
                </Link>

                <Link to="/motorista/abastecimentos" className="dashboard-card">
                    <FaGasPump size={40} />
                    <span>Registrar Abastecimento</span>
                </Link>
            </div>

            <section className="atividades-recentes">
                <h2>Atividades Recentes</h2>
                <ul className="atvidades-list">
                    <li className="atividades-item">Checklist realizado no Veículo X - 14/10/2025</li>
                    <li className="atividades-item">Abastecimento (32.8L) registrado - 13/10/2025</li>
                    <li className="atividades-item">Jornada finalizada - 12/10/2025</li>
                </ul>
            </section>
        </div>
    );
};

export default DashboardMotorista;