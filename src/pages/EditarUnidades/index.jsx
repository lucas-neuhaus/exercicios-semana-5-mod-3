import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Botao from "../../components/Botao";

import "./editarUnidades.css"

const EditarUnidade = () => {
  const navegar = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    apelido: "",
    local: "",
    marca: "",
    modelo: "",
    status: false,
  });

  useEffect(() => {
    fetch(`http://localhost:3000/unidades/${id}`)
      .then((response) => response.json())
      .then((unidade) => {
        setForm(unidade);
      });
  }, [id]);

  const atualizaForm = (evento) => {
    setForm({
      ...form,
      [evento.target.id]: evento.target.value,
    });
  };

  const atualizaStatus = (evento) => {
    setForm({
      ...form,
      status: evento.target.checked,
    });
  };

  const enviarAtualizacaoUnidade = () => {
    fetch(`http://localhost:3000/unidades/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((response) => {
      if (response.ok) {
        alert("Unidade atualizada com sucesso!");
        navegar("/unidades");
      } else {
        alert("Erro ao atualizar a unidade!");
      }
    });
  };

  return (
    <>
      <section className="editar-unidade-container">
        <Link to="/unidades">Voltar</Link>
        <h1>Editar Unidade</h1>
        <div className="editar-unidade-form">
          <Input
            id="apelido"
            etiqueta="Apelido"
            valor={form.apelido || ""}
            aoMudar={atualizaForm}
          />
          <Input
            id="local"
            etiqueta="Local"
            valor={form.local || ""}
            aoMudar={atualizaForm}
          />
          <Input
            id="marca"
            etiqueta="Marca"
            valor={form.marca || ""}
            aoMudar={atualizaForm}
          />
          <Input
            id="modelo"
            etiqueta="Modelo"
            valor={form.modelo || ""}
            aoMudar={atualizaForm}
          />
          <div>
            <input
              type="checkbox"
              id="status"
              checked={form.status || ""}
              onChange={atualizaStatus}
            />
            <label htmlFor="status">Status</label>
          </div>
          <Botao aoClicar={enviarAtualizacaoUnidade} enviar="Salvar" />
        </div>
      </section>
    </>
  );
};

export default EditarUnidade;
