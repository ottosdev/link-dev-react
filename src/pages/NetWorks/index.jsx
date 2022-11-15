import { useEffect, useState } from "react";
import HeaderAdmin from "../../components/Admin/Header";
import Input from "../../components/Input";
import "./networks.css";
import { toast } from "react-toastify";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebaseConnection";
export default function Networks() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!facebook && !instagram && !youtube) {
      toast.warn("Por favor informe todos os links.");
      return;
    }
    const formValues = {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
    };
    setDoc(doc(db, "social", "link"), {
      ...formValues,
    })
      .then(() => {
        toast.success("Links foram salvos com sucesso.");
      })
      .catch(() => {
        toast.error("Erro ao salvar os links");
      });
  }

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
            setFacebook(snapshot.data().facebook);
            setInstagram(snapshot.data().instagram);
            setYoutube(snapshot.data().youtube);
        }
      });
    }

    loadLinks();
  }, []);

  return (
    <div className="admin-container">
      <HeaderAdmin />

      <h1 className="title-social">Suas redes sociais</h1>

      <form className="form" onSubmit={handleSubmit}>
        <label className="label">Link do facebook</label>
        <Input
          type="url"
          placeholder="Digite a url do facebook"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
        <label className="label">Link do instagram</label>
        <Input
          type="url"
          placeholder="Digite a url do instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <label className="label">Link do youtube</label>
        <Input
          type="url"
          placeholder="Digite a url do youtube"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />

        <button type="submit" className="btn-register">
          Salvar links
        </button>
      </form>
    </div>
  );
}
