import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Botao from "../../components/Botao";
import Input from "../../components/Input";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("teste@gmail.com");
  const [senha, setSenha] = useState("123");

  const navegar = useNavigate();

  const confirmarLogin = () => {
    if (email === "") {
      toast.warn("Digite um e-mail válido");
      return;
    }
    if (senha === "") {
      toast.warn("Digite uma senha válida");
      return;
    }
  
    fetch("http://localhost:3000/usuarios")
      .then((response) => response.json())
      .then((data) => {
        const usuario = data.find((usuario) => usuario.email === email && usuario.senha === senha);
  
        if (usuario) {
          toast.success("Login bem-sucedido!");
          navegar("/dashboard");
        } else {
          toast.warn("Credenciais inválidas");
        }
      })
      .catch((error) => {
        console.error("Erro ao efetuar o login:", error);
        toast.error("Erro ao efetuar o login");
      });
  };
  
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Seja bem-vindo!</h1>
        <p className="login-subtitle">Digite os seus dados de acesso:</p>

        <form className="login-form">
          <Input
            etiqueta="Email"
            id="email"
            aoMudar={(e) => setEmail(e.target.value)}
            tipo="text"
            valor={email}
          />
          <Input
            etiqueta="Senha"
            id="senha"
            aoMudar={(e) => setSenha(e.target.value)}
            tipo="password"
            valor={senha}
          />

          <div className="login-button">
            <Botao
              aoClicar={confirmarLogin}
              tipo="button"
              enviar="Entrar"
              cor="primary"
            />
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;