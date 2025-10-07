import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { FaUsers, FaCar } from "react-icons/fa";
import { GrHostMaintenance } from "react-icons/gr";
import './LayoutAdmin.css';
import { FiLogOut } from 'react-icons/fi';

const LayoutAdmin = () => {
  const navigate = useNavigate();

  const handleEncerrarSessao = () => {
    localStorage.clear();

    navigate('/');
  };

  return (
    <div className="container-layout-admin">

      <aside className="sidebar">
        <h2>FroTech</h2>
        <nav>
          <ul>
            <li>
              <Link to="/admin/dashboard">
                <MdOutlineDashboard />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/usuario">
                <FaUsers />
                <span>Gerenciar Usuários</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/veiculos">
                <FaCar/>
                <span>Gerenciar Veículos</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/manutencao">
                <GrHostMaintenance />
                <span>Gerenciar Manutenções</span>
              </Link>
            </li>
            <li className='sair'>
              <a href='' onClick={handleEncerrarSessao}>
                <FiLogOut />
                <span>Sair</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="conteudo-principal">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAdmin;