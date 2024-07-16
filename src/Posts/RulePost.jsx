import React, { useEffect } from "react";
import NewPostButt from "../Elements/NewPostButt";
import { useNavigate } from "react-router-dom";
import Head from "../helper/head";
import SinglePost from "./Post/SinglePost";
import useFirebase from "../Data/useFirebase";
import PostModal from "./Post/PostModal";
import Input from "./../Elements/Input";

import styles from "./styles/Default.module.css";

const GetFilter = (search, Docment, Selected) => {
  if (!search) {
    return Docment;
  }
  switch (Selected) {
    case "Name":
      return Docment.filter(
        (Post) => Post.UserName && Post.UserName.includes(search)
      );
      break;
    case "Titulo":
      return Docment.filter(
        (Post) => Post.TituloP && Post.TituloP.includes(search)
      );
      break;
    case "Sistema":
      return Docment.filter((Post) => Post.SyR && Post.SyR.includes(search));
      break;
    default:
      break;
  }
};

const RulePost = () => {
  const { Rule, GetUpdate } = useFirebase();
  const [modal, setModal] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [Selected, setSelected] = React.useState("Name");
  const [limit, setLimit] = React.useState(5);
  let filterPost = GetFilter(search, Rule, Selected);
  const navigate = useNavigate();

  useEffect(() => {
    GetUpdate("RULE");
  }, []);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setLimit((limitInsideState) => limitInsideState + 5);
      }
    });
    intersectionObserver.observe(document.querySelector("#sentinel"));

    return () => intersectionObserver.disconnect();
  }, []);

  return (
    <div className={`body`}>
      <Head tittle="Posts de Regra" />
      <section className={`sec`}>
        <h1 className={`tittle`}>Regras de Sistemas</h1>
        <p className={`paragrf`}>
          Alguma dúvida sobre uma regra específica de algum sistema? Pesquise
          aqui pelas categorias do sistema em questão.
          <br />
          Caso não ache, poste sua dúvida, talvez alguém lhe responda e sua
          dúvida ira ficar armazenada aqui para ajudar outras pessoas.
        </p>

        <div className={`divGrid`}>
          <p className="AlarmP">
            Assim como qualquer dúvida de qualquer sistema, é permitido abrir
            discussões sobre mudanças de regras para determinados sistemas
            normalmente.
          </p>
          <p className="AlarmP">
            Como nos resumos de sistemas, não nos responsabilizamos com o uso de
            terceiros por suas próprias criações de regras, caso queira abrir
            discussões maiores sobre regras de sistemas próprios, use os{" "}
            <strong
              className="strong clicabo"
              onClick={() => navigate("/Post/GeneralPost")}
            >
              Posts Gerais
            </strong>{" "}
            para isso.
          </p>
          <p className="AlarmP">
            É permitido imagens e links externos para provar seu ponto, mas não
            link de download ou site de pirataria, posts deste tipo serão
            sujeitos a <strong className="strong">exclusão</strong> sem aviso. A
            DKS não se responsabiliza por pirataria de terceiros.
          </p>
        </div>
      </section>
      <div className="RedDivider"></div>
      <section className={`sec littleFlexCenter`}>
        <div className={styles.searchBox}>
          <Input
            className={styles.Search}
            type="text"
            onChange={({ target }) => {
              setSearch(target.value);
            }}
            placeholder="Pequise pelo...."
            name={search}
          />
          <div>
            <select
              name="Search"
              id="Search"
              className={styles.selec}
              onChange={({ target }) => setSelected(target.value)}
            >
              <option value="Name">Nome</option>
              <option value="Titulo">Titulo</option>
              <option value="Sistema">Sistema</option>
            </select>
          </div>
        </div>
        <NewPostButt>Poste aqui</NewPostButt>
        <div className={styles.BackPostsGrid}>
          {modal && (
            <PostModal element={modal} type="RULE" setModal={setModal} />
          )}
          {filterPost.map((element, index) => {
            if (limit >= index) {
              return (
                <SinglePost
                  element={element}
                  index={index}
                  type={"RULE"}
                  setModal={setModal}
                />
              );
            }
          })}
          <li id="sentinel" className={styles.LI} />
        </div>
      </section>
    </div>
  );
};

export default RulePost;
