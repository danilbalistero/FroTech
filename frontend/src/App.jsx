import { Routes, Route } from "react-router-dom";
import Login from "./pages/comum/Login";
import DashboardAdmin from "./pages/admin/Dashboard";
import DashboardMotorista from "./pages/motorista/Dashboard";
import Rotas from "./routes/Rotas";
import LayoutAdmin from "./components/LayoutAdmin";
import Usuario from "./pages/admin/Usuario";
import Veiculo from "./pages/admin/Veiculo";
import Manutencao from "./pages/admin/Manutencao";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

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
            <DashboardMotorista />
          </Rotas>
        }
      >
        <Route index element={<DashboardMotorista />} />
      </Route>
    </Routes>
  );
}

export default App;