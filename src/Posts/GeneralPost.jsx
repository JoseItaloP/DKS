import React, { useEffect } from "react";
import NewPostButt from "../Elements/NewPostButt";
import Head from "../helper/head";
import useFirebase from "../Data/useFirebase";
import SinglePost from "./Post/SinglePost";
import Input from "./../Elements/Input";
import PostModal from "./Post/PostModal";

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
    default:
      break;
  }
};

const GeneralPost = () => {
  const { General, GetUpdate } = useFirebase();
  const [modal, setModal] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [Selected, setSelected] = React.useState("Name");
  const [limit, setLimit] = React.useState(5);
  let filterPost = GetFilter(search, General, Selected);

  useEffect(() => {
    GetUpdate("GENERAL");
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
      <Head tittle="Posts Geral" />
      <section className={`sec`}>
        <h1 className="tittle"> Posts Gerais </h1>
        <p className="paragrf">
          Caso sua ideia de post não se encaixe em nenhuma categoria, faça ela
          aqui. <br /> Como, por exemplo, detalhes de sistemas que não são
          realmente necessários, tipos de encontros em sistemas específicos,
          ideais para sua mesa, supostos vilões, como se inspirar melhor para
          melhores histórias e etc, as possibilidades são infinitas.
        </p>

        <div className="divGrid">
          <p className="AlarmP">
            Caso queira divulgar alguma mesa em que vocês estejam mestrando ou
            que pretendam mestra, ou até seu canal no YouTube ou Twitch, esteja
            livre para divugá-lo aqui. Aos que pretender acessar este tipo de
            conteúdo, em caso de problemas serios com a mesa ou link passado,
            entre em contato com a equipe para a remoção do post em questão.
          </p>
          <p className="AlarmP">
            Os Posts gerais foram feitos para englobar qualquer coisa que tenha
            alguma relação com RPG de mesa, mas tenha cuidado para não fugir
            muito do tema. Conteúdos{" "}
            <strong className="strong">muito pesados</strong> serão sujeitos a
            banimento sem aviso.
          </p>
          <p className="AlarmP">
            Lembre-se, aqui ficam os posts que não se encaixam diretamente com
            nenhum dos outros tipos de posts, reveja seu post antes de
            divulgá-lo, talvez ele realmente se encaixe em algum dos outros
            tipos de posts da pagina.
          </p>
        </div>
      </section>
      <div className="RedDivider"></div>
      <section className="sec littleFlexCenter">
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
            </select>
          </div>
        </div>
        <NewPostButt>Crie um Post</NewPostButt>
        <div className={styles.BackPostsGrid}>
          {modal && (
            <PostModal element={modal} type="GENERAL" setModal={setModal} />
          )}
          {filterPost.map((element, index) => {
            if (limit >= index) {
              return (
                <SinglePost
                  element={element}
                  index={index}
                  type={"GENERAL"}
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

export default GeneralPost;
