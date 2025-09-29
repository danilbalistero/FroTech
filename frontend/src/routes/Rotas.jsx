import React from 'react';
import { Navigate } from 'react-router-dom';

const Rotas = ({ children, perfilPermitido}) => {
    const token = localStorage.getItem('token');
    const perfil = localStorage.getItem('perfil');

    if (!token) {
        return <Navigate to="/" />;
    }

    if (perfilPermitido && perfil !== perfilPermitido){
        return <Navigate to='/acesso-negado' replace />;
    }

    return children;
}

export default Rotas;