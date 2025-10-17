import { Routes, Route } from "react-router-dom";
import Login from "./pages/comum/Login";
import DashboardAdmin from "./pages/admin/Dashboard";
import DashboardMotorista from "./pages/motorista/DashboardMotorista";
import Rotas from "./routes/Rotas";
import LayoutAdmin from "./components/LayoutAdmin";
import Usuario from "./pages/admin/Usuario";
import Veiculo from "./pages/admin/Veiculo";
import Manutencao from "./pages/admin/Manutencao";
import DefinirSenha from "./pages/auth/DefinirSenha";
import Abastecimento from "./pages/motorista/Abastecimento";
import LayoutMotorista from "./components/LayoutMotorista";

function App() {
  return (
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
        <Route path="dashboard" element={<DashboardAdmin />} />
        <Route path="usuario" element={<Usuario />} />
        <Route path="veiculos" element={<Veiculo />} />
        <Route path="manutencao" element={<Manutencao />} />
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
      </Route>
    </Routes>
  );
}

export default App;