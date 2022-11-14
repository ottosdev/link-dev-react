import "./style.css";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { auth } from "../../../services/firebaseConnection";
import { signOut } from "firebase/auth";
export default function HeaderAdmin() {
  async function handleLougout() {
    localStorage.removeItem("@detailUser");
    await signOut(auth);
  }

  return (
    <header className="admin-header">
      <nav className="nav-header">
        <button onClick={handleLougout}>
          <BiLogOut size={28} color="#db2629" />
        </button>

        <Link to="/admin">Links</Link>
        <Link to="/admin/social">Rede Sociais</Link>
      </nav>
    </header>
  );
}
