import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Botao from "../../components/Botao";
import Input from "../../components/Input";

import "./geracaoMensal.css"


const GeracaoMensal = () => {
  const navegar = useNavigate();

  const [unidades, setUnidades] = useState([]);
  const [form, setForm] = useState({
    unidadeId: "",
    data: "",
    totalKwGerado: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/unidades")
      .then((response) => response.json())
      .then((data) => setUnidades(data));
  }, []);

  const atualizaForm = (evento) => {
    setForm({
      ...form,
      [evento.target.id]: evento.target.value,
    });
  };

  const enviarCadastroGeracaoMensal = () => {
    if (!form.unidadeId || !form.data || !form.totalKwGerado) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (isNaN(Number(form.totalKwGerado))) {
      alert("O valor de kW gerado deve ser um número válido.");
      return;
    }

    fetch("http://localhost:3000/geracoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((response) => {
      if (response.ok) {
        alert("Geração mensal cadastrada com sucesso!");
        navegar("/dashboard"); 
      } else {
        alert("Erro ao cadastrar a geração mensal!");
      }
    });
  };

  return (
    <>
      <section className="geracao-mensal-container">
        <h1>Lançamento de Geração Mensal</h1>
        <div className="geracao-mensal-form">
          <Input
            id="unidadeId"
            etiqueta="Unidade"
            tipo="select"
            opcoes={unidades.map((unidade) => ({
              valor: unidade.id,
              rotulo: unidade.apelido,
            }))}
            valor={form.unidadeId}
            aoMudar={atualizaForm}
          />
          <Input
            id="data"
            etiqueta="Data"
            tipo="date"
            valor={form.data}
            aoMudar={atualizaForm}
          />
          <Input
            id="totalKwGerado"
            etiqueta="Total kW Gerado"
            tipo="number"
            valor={form.totalKwGerado}
            aoMudar={atualizaForm}
          />
          <Botao aoClicar={enviarCadastroGeracaoMensal} enviar="Salvar" />
        </div>
      </section>
    </>
  );
};

export default GeracaoMensal;

