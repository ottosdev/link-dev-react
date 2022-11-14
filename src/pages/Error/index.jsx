import "./error.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../../components/Logo'
export default function Error() {
  const {} = useNavigate();

  return (
    <div className="error">
      <Logo />
      <h1>Pagina não encontrada</h1>
      <p>Esta pagina que esta procurando nao existe</p>
      <Link to="/" className="link">
        Voltar para home
      </Link>
    </div>
  );
}
