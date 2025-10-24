import { Routes, Route } from "react-router-dom";
import Rotas from "./routes/Rotas";
import { lazy, Suspense } from "react";
import Login from "./pages/comum/Login";
import LayoutAdmin from "./components/LayoutAdmin";
import LayoutMotorista from "./components/LayoutMotorista";
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Usuario = lazy(() => import("./pages/admin/Usuario"));
const Veiculo = lazy(() => import("./pages/admin/Veiculo"));
const Manutencao = lazy(() => import("./pages/admin/Manutencao"));
const Relatorio = lazy(() => import('./pages/admin/Relatorio'));
const DashboardMotorista = lazy(() => import("./pages/motorista/DashboardMotorista"));
const Abastecimento = lazy(() => import("./pages/motorista/Abastecimento"));
const Checklist = lazy(() => import("./pages/motorista/Checklist"));
const DefinirSenha = lazy(() => import("./pages/auth/DefinirSenha"));

const FallbackCarregando = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f9' }}>
    <h2 style={{ color: '#091d35' }}>Carregando...</h2>
  </div>
);

function App() {
  return (
    <Suspense fallback={<FallbackCarregando />}>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/definir-senha"
          element={
            <Rotas>
              <DefinirSenha />
            </Rotas>
          }
        />

        <Route
          path="/admin"
          element={
            <Rotas perfilPermitido="ADMIN">
              <LayoutAdmin />
            </Rotas>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="usuario" element={<Usuario />} />
          <Route path="veiculos" element={<Veiculo />} />
          <Route path="manutencao" element={<Manutencao />} />
          <Route path="relatorios" element={<Relatorio />} />
        </Route>

        <Route
          path="/motorista"
          element={
            <Rotas perfilPermitido="MOTORISTA">
              <LayoutMotorista />
            </Rotas>
          }
        >
          <Route path="dashboard" element={<DashboardMotorista />} />
          <Route path="abastecimentos" element={<Abastecimento />} />
          <Route path="checklist" element={<Checklist />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;