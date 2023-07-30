import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./listagemUnidades.css"

const ListagemUnidades = () => {
  const [unidades, setUnidades] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/unidades")
      .then((response) => response.json())
      .then((data) => setUnidades(data));
  }, []);

  const handleRemoverUnidade = (id) => {
    fetch(`http://localhost:3000/unidades/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("Unidade removida com sucesso!");
          setUnidades(unidades.filter((unidade) => unidade.id !== id));
        } else {
          alert("Erro ao remover a unidade!");
        }
      });
  };
  return (
    <div className="listagem-unidades-container">
      <h1>Listagem de Unidades</h1>
      <Link to="/unidades/nova" className="listagem-unidades-link">Nova Unidade</Link>
      <table className="listagem-unidades-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Apelido</th>
            <th>Local</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {unidades.map((unidade) => (
            <tr key={unidade.id}>
              <td>{unidade.id}</td>
              <td>{unidade.apelido}</td>
              <td>{unidade.local}</td>
              <td>{unidade.marca}</td>
              <td>{unidade.modelo}</td>
              <td>
                <Link to={`/unidades/editar/${unidade.id}`} className="listagem-unidades-link">Editar</Link>
                <button onClick={() => handleRemoverUnidade(unidade.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListagemUnidades;
