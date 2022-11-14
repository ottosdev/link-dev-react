import { Link } from "react-router-dom";
import "./logo.css";
export default function Logo() {
  return (
    <Link to="/">
      <h1 className="logo">
        Dev<span>Link</span>
      </h1>
    </Link>
  );
}
