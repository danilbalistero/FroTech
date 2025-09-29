import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/Card/DashboardCard";
import { listarVeiculos } from "../../service/veiculoService";
import './Dashboard.css';
import { FaCar, FaUsers } from 'react-icons/fa';
import { GrHostMaintenance } from "react-icons/gr";


const Dashboard = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [manutencoes, setManutencoes] = useState([]);

  useEffect(() => {
    const veiculosSalvos = JSON.parse(localStorage.getItem('veiculos')) || [];
    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];
    const manutencoesSalvas = JSON.parse(localStorage.getItem('manutencoes')) || [];

    setVeiculos(veiculosSalvos);
    setUsuarios(usuariosSalvos);
    setManutencoes(manutencoesSalvas);
  }, []);

const totalVeiculos = veiculos.length;
const veiculosAtivos = veiculos.filter(v => v.status === 'ATIVO').length;

const usuariosAdmin = usuarios.filter(u => u.perfil === 'ADMIN').length;
const usuariosMotoristas = usuarios.filter(u => u.perfil === 'MOTORISTA').length;
const usuariosRole = `${usuariosAdmin} administradores e ${usuariosMotoristas} motoristas`

const totalManutencoes = manutencoes.length;
const manutencoesAndamento = manutencoes.filter(m => m.status === 'ANDAMENTO').length;
const manutencoesAgendadas = manutencoes.filter(m => m.status === 'AGENDADA').length;
const subtituloManutencoes = `${manutencoesAndamento} em andamento, ${manutencoesAgendadas} agendadas`;

  return (
    <div className="container-dashboard">
      <h1>Dashboard Administrador</h1>
      <div className="grid-cards">

        <DashboardCard
          titulo="Total de Veículos"
          valor={totalVeiculos}
          subtitulo={`${veiculosAtivos} ativos`}
          icone={<FaCar/>}
        />

        <DashboardCard
          titulo="Total de Usuários"
          valor={usuarios.length}
          subtitulo={usuariosRole}
          icone={<FaUsers/>}
        />

        <DashboardCard
        titulo="Total de Manutenções"
        valor={totalManutencoes}
        subtitulo={subtituloManutencoes} 
        icone={<GrHostMaintenance />}
      />

      </div>
    </div>
  );

};

export default Dashboard;
