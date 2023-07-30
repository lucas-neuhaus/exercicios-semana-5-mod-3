import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../components/Input";
import Botao from "../../components/Botao";
import "./cadastroUnidades.css";

const CadastrarProduto = ({ modoEdicao = false }) => {
  const navegar = useNavigate();

  const [form, setForm] = useState({
    apelido: "",
    local: "",
    marca: "",
    modelo: "",
    status: false,
  });

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

  const enviarCadastroUnidade = () => {
    if (
      !form.apelido ||
      !form.local ||
      !form.marca ||
      !form.modelo ||
      form.apelido.trim() === "" ||
      form.local.trim() === "" ||
      form.marca.trim() === "" ||
      form.modelo.trim() === ""
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    fetch("http://localhost:3000/unidades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((response) => {
      if (response.ok) {
        alert("Unidade cadastrada com sucesso!");
        navegar("/unidades");
      } else {
        alert("Erro ao cadastrar a unidade!");
      }
    });
  };

  const enviarAtualizacaoUnidade = () => {
    fetch(`http://localhost:3000/unidades/${unidadeId}`, {
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

  const unidadeId = useParams().id;

  useEffect(() => {
    if (modoEdicao) {
      fetch(`http://localhost:3000/unidades/${unidadeId}`)
        .then((response) => response.json())
        .then((unidade) => {
          setForm(unidade);
        });
    }
  }, [modoEdicao, unidadeId]);

  return (
    <>
      <section className="CadastrarProduto">
        <Link to={-1}>Voltar</Link>
        <h1 className="CadastrarProduto__titulo">
          {modoEdicao ? "Editar Unidade" : "Cadastrar Unidade"}
        </h1>
        <div className="CadastrarProduto__conteudo">
          <Input
            id="apelido"
            etiqueta="Apelido"
            valor={form.apelido}
            aoMudar={atualizaForm}
          />
          <Input
            id="local"
            etiqueta="Local"
            valor={form.local}
            aoMudar={atualizaForm}
          />
          <Input
            id="marca"
            etiqueta="Marca"
            valor={form.marca}
            aoMudar={atualizaForm}
          />
          <Input
            id="modelo"
            etiqueta="Modelo"
            valor={form.modelo}
            aoMudar={atualizaForm}
          />
          <div className="CadastrarProduto__checkbox">
            <input
              type="checkbox"
              id="status"
              checked={form.status}
              onChange={atualizaStatus}
            />
            <label htmlFor="status">Status</label>
          </div>
          {modoEdicao ? (
            <Botao
              aoClicar={enviarAtualizacaoUnidade}
              titulo="Atualizar Unidade"
              enviar="Atualizar"
            />
          ) : (
            <Botao aoClicar={enviarCadastroUnidade} enviar="Cadastrar Unidade" />
          )}
        </div>
      </section>
    </>
  );
};

export default CadastrarProduto;

