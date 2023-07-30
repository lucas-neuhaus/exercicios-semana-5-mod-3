import { useState, useEffect } from "react";
import "./dashboard.css"

const Dashboard = () => {
  const [totalUnidades, setTotalUnidades] = useState(0);
  const [unidadesAtivas, setUnidadesAtivas] = useState(0);
  const [unidadesInativas, setUnidadesInativas] = useState(0);
  const [mediaEnergia, setMediaEnergia] = useState(0);

  const unidades = [
    { id: 1, status: true, total: 100 },
    { id: 2, status: false, total: 200 },
    { id: 3, status: true, total: 150 },
  ];

  useEffect(() => {
    setTotalUnidades(unidades.length);
    setUnidadesAtivas(unidades.filter((unidade) => unidade.status === true).length);
    setUnidadesInativas(unidades.filter((unidade) => unidade.status === false).length);

    const somaTotalEnergia = unidades.reduce((total, unidade) => total + unidade.total, 0);
    setMediaEnergia(somaTotalEnergia / unidades.length);
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-stats">
        <div className="dashboard-stat">
          <h3>Total de Unidades</h3>
          <p>{totalUnidades}</p>
        </div>
        <div className="dashboard-stat">
          <h3>Unidades Ativas</h3>
          <p>{unidadesAtivas}</p>
        </div>
        <div className="dashboard-stat">
          <h3>Unidades Inativas</h3>
          <p>{unidadesInativas}</p>
        </div>
        <div className="dashboard-stat">
          <h3>Média de Energia</h3>
          <p>{mediaEnergia}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
