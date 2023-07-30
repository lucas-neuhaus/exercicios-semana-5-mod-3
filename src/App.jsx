import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ListagemUnidades from "./pages/ListagemUnidades";
import EditarUnidades from "./pages/EditarUnidades";
import CadastroUnidades from "./pages/CadastroUnidades";
import GeracaoMensal from "./pages/GeracaoMensal";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className="sidebar">
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/unidades">Unidade Consumidora</Link>
              </li>
              <li>
                <Link to="/geracoes/nova">Cadastro de energia gerada</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/unidades" element={<ListagemUnidades />} />
            <Route path="/unidades/nova" element={<CadastroUnidades />} />
            <Route path="/unidades/editar/:id" element={<EditarUnidades />} />
            <Route path="/geracoes/nova" element={<GeracaoMensal />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;







