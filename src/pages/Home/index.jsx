import Social from "../../components/Social";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import "./home.css";
import { db } from "../../services/firebaseConnection";
import {
  getDocs,
  collection,
  orderBy,
  query,
  getDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
const socialUrls = {
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  youtube: "https://youtube.com",
};

export default function Home() {
  const [list, setList] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});
  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));
      getDocs(queryRef).then((snapshot) => {
        let lista = [];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setList(lista);
      });
    }
    loadLinks();
  }, []);

  useEffect(() => {
    function loadSocialDoc() {
      const docRef = doc(db, "social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            facebook: snapshot.data().facebook,
            instagram: snapshot.data().instagram,
            youtube: snapshot.data().youtube,
          });
        }
      });
    }
    loadSocialDoc();
  });
  return (
    <div className="home-container">
      <h1>Sujeito Programdor</h1>
      <span>veja meus links 😏</span>

      <main className="links">
        {list.map((item) => (
          <section
            className="link-area"
            key={item.id}
            style={{ background: item.background }}
          >
            <a href="#">
              <p className="link-text" style={{ color: item.color }}>
                {item.name}
              </p>
            </a>
          </section>
        ))}

        {list.length !== 0 && Object.keys(socialLinks).length > 0 && (
          <footer>
            <Social url={socialLinks?.facebook}>
              <FaFacebook size={25} color="#fff" />
            </Social>
            <Social url={socialLinks?.instagram}>
              <FaYoutube size={25} color="#fff" />
            </Social>
            <Social url={socialLinks?.youtube}>
              <FaInstagram size={25} color="#fff" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
}
