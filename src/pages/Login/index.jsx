import "./login.css";
import Logo from "../../components/Logo";
import { useState } from "react";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/Input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();

    if (email.trim() && password.trim()) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("Bem vindo de volta 😉");
          navigate("/admin", { replace: true });
        })
        .catch(() => {
          toast.error("Error ao tentar fazer o login!");
        });

      return;
    }
    alert("Prencha todos os campos");
  }
  return (
    <div className="login-container">
      <Logo />

      <form className="form" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Digite seu e-mail..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
           type="password"
           placeholder="Digite seu password..."
           autoCapitalize="on"
           value={password}
           onChange={(e) => setPasword(e.target.value)}
        />


        <button type="submit">Acessar</button>
      </form>
    </div>
  );
}
