import HeaderAdmin from "../../components/Admin/Header";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import { MdAddLink } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import "./admin.css";
import { useEffect, useState } from "react";
import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { async } from "@firebase/util";
export default function Admin() {
  const [color, setColor] = useState("");
  const [background, setBackground] = useState("");
  const [nomeInput, setNomeInput] = useState("");
  const [url, setUrl] = useState("");
  const [list, setList] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!nomeInput || !url) {
      toast.warn("Preencha todos os campos");
      return;
    }

    const formValues = {
      name: nomeInput,
      url: url,
      background: background,
      color: color,
      created: new Date(),
    };

    addDoc(collection(db, "links"), { ...formValues })
      .then((res) => {
        toast.success("Cadastro de links efetuado com sucesso");
        setNomeInput("");
        setUrl("");
        setBackground("");
        setColor("");
      })
      .catch((e) => {
        toast.error("Error ao registrar", e);
      });
  }

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));
    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setList(lista);
    });
  }, []);

  async function handleDelete(id) {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef)
      .then(() => {
        toast.success("Link deletador com sucesso");
      })
      .catch(() => {
        toast.error("Ocorreu um error ao deletar");
      });
  }

  return (
    <div className="admin-container">
      <HeaderAdmin />
      <Logo />

      <form className="form" onSubmit={handleSubmit}>
        <label className="label">Nome do link</label>
        <Input
          placeholder="Nome do link..."
          value={nomeInput}
          onChange={(e) => setNomeInput(e.target.value)}
        />

        <label className="label">Url do link</label>
        <Input
          placeholder="Digite a url do link"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <section className="container-colors">
          <div>
            <label className="label right">Fundo do link</label>
            <input
              type="color"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
            />
          </div>
          <div>
            <label className="label right">Cor do link</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </section>

        {nomeInput && (
          <div className="preview">
            <label className="label"> Veja como esta ficando</label>
            <article
              className="list"
              style={{ backgroundColor: background, color: color }}
            >
              <p>{nomeInput}</p>
            </article>
          </div>
        )}

        <button className="btn-register" type="submit">
          Cadastrar
          <MdAddLink size={24} color="white" />
        </button>
      </form>

      <h2 style={{ color: "white" }}>Meus links</h2>
      {list.map((item) => (
        <article
          key={item.id}
          className="list animate-pop"
          style={{ backgroundColor: item.background, color: item.color }}
        >
          <p>{item.name}</p>
          <div>
            <button className="delete" onClick={() => handleDelete(item.id)}>
              <FiTrash2 size={18} color="white" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
