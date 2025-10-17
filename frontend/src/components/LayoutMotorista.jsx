import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FiLogOut, FiArrowLeft } from 'react-icons/fi';
import './LayoutMotorista.css';

const LayoutMotorista = () => {
    const navigate = useNavigate();
    const location = useLocation();

    let title = "Painel do Motorista";
    let showLogout = false;
    let showBack = false;

    switch (location.pathname) {
        case '/motorista/dashboard':
            title = "Bem vindo, Motorista!";
            showLogout = true;
            break;
        case '/motorista/abastecimentos':
            showBack = true;
            break;
        case '/motorista/checklist':
            showBack = true;
            break;
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleBack = () => {
        navigate('/motorista/dashboard');
    };

    return (
        <div>
            <header className="topbar">
                <div className="topbar-content">
                    {showBack && (
                        <button onClick={handleBack} className="topbar-button back-button">
                            <FiArrowLeft size={20} />
                            <span>Voltar</span>
                        </button>
                    )}

                    <h1 className="topbar-title">{title}</h1>

                    {showLogout && (
                        <button onClick={handleLogout} className="topbar-button logout-button">
                            <FiLogOut size={20} />
                            <span>Sair</span>
                        </button>
                    )}
                </div>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default LayoutMotorista;