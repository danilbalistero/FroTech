import React, { useEffect, useState } from "react";
import DashboardCard from "../../components/Card/DashboardCard";
import './Dashboard.css';
import { FaCar, FaUsers } from 'react-icons/fa';
import { GrHostMaintenance } from "react-icons/gr";
import * as veiculoService from '../../service/veiculoService';
import * as usuarioService from '../../service/usuarioService';

const Dashboard = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [manutencoes, setManutencoes] = useState([]);

  useEffect(() => {
    const buscarDadosDashboard = async () => {
      try {
        const [veiculosData, usuariosData] = await Promise.all([
          veiculoService.listarVeiculos(),
          usuarioService.listarUsuariosAtivos(),
        ]);

        setVeiculos(veiculosData);
        setUsuarios(usuariosData);

      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
        alert('Não foi possível carregar os dados do dashboard.');
      }
    };

    buscarDadosDashboard();
  }, []);

  const totalVeiculos = veiculos.length;
  const veiculosDisponiveis = veiculos.filter(v => v.status === 'DISPONIVEL').length;

  const totalUsuarios = usuarios.length;
  const usuariosAdmin = usuarios.filter(u => u.role === 'ROLE_ADMIN').length;
  const usuariosMotoristas = usuarios.filter(u => u.role === 'ROLE_MOTORISTA').length;
  const subtituloUsuarios = `${usuariosAdmin} admin(s) e ${usuariosMotoristas} motorista(s)`;

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
          subtitulo={`${veiculosDisponiveis} disponíveis`}
          icone={<FaCar />}
        />

        <DashboardCard
          titulo="Total de Usuários"
          valor={totalUsuarios}
          subtitulo={subtituloUsuarios}
          icone={<FaUsers />}
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