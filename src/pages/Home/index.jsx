import Social from "../../components/Social";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import "./home.css";

const socialUrls = {
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  youtube: 'https://youtube.com'
}

export default function Home() {
  return (
    <div className="home-container">
      <h1>Sujeito Programdor</h1>
      <span>veja meus links 😏</span>

      <main className="links">
        <section className="link-area">
          <a href="#">
            <p className="link-text">Canal do youtube</p>
          </a>
        </section>
        <section className="link-area">
          <a href="#">
            <p className="link-text">Canal do youtube</p>
          </a>
        </section>
        <section className="link-area">
          <a href="#">
            <p className="link-text">Canal do youtube</p>
          </a>
        </section>

        <footer>
          <Social url={socialUrls.facebook}>
            <FaFacebook size={25} color="#fff" />
          </Social>
          <Social url={socialUrls.facebook}>
            <FaYoutube size={25} color="#fff" />
          </Social>
          <Social url={socialUrls.facebook}>
            <FaInstagram size={25} color="#fff" />
          </Social>
        </footer>
      </main>
    </div>
  );
}
