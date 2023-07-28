import { Link } from "react-router-dom";

const MenuLateral = () => {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/unidade-consumidora">Unidade Consumidora</Link>
          </li>
          <li>
            <Link to="/cadastro-energia">Cadastro de Energia Gerada</Link>
          </li>
        </ul>
      </nav>
    );
  };

  export default MenuLateral