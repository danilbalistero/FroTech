import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { FaUsers, FaCar } from "react-icons/fa";
import { GrHostMaintenance } from "react-icons/gr";
import './LayoutAdmin.css'; 

const LayoutAdmin = () => {
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