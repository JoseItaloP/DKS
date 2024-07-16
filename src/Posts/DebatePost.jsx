import React, { useEffect } from "react";
import NewPostButt from "../Elements/NewPostButt";
import Head from "../helper/head";
import useFirebase from "../Data/useFirebase";
import SinglePost from "./Post/SinglePost";
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
    default:
      break;
  }
};

const DebatePost = () => {
  const { Debate, GetUpdate } = useFirebase();
  const [modal, setModal] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [Selected, setSelected] = React.useState("Name");
  const [limit, setLimit] = React.useState(5);
  let filterPost = GetFilter(search, Debate, Selected);

  useEffect(() => {
    GetUpdate("DEBATE");
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
      <Head tittle="Posts de debate" />
      <section className={`sec`}>
        <h1 className={`tittle`}>Debates</h1>
        <p className={`paragrf`}>
          Abra uma discursarão saudável sobre um tema de RPG! Estamos abertos
          sobre qualquer questionamento sobre o tema,{" "}
          <strong className={`strong`}>mas não saia dele</strong>.
          <br /> Caso resolva falar de um sistema em que poucos conhecem, esteja
          ciente que talvez a sua resposta seja lenta, você pode recorrer a
          criar um resumo de um sistema, caso queira que mais pessoas conheçam o
          sistema.
          <br /> Questões sobre os universos recorrentes aos sistemas, como{" "}
          <strong className={`strong`}>Forgotten Realms</strong>,{" "}
          <strong className={`strong`}>Golarian</strong> ou{" "}
          <strong className={`strong`}>A República</strong>, são devidamente
          permitidos com debates aqui, mas tenha em mente que essas questões
          podem ultrapassar linhas e acabam saindo do foco do grupo, isso por si
          só não é um problema, mas questões mais interpessoais podem levar a
          discrições mais pesadas, entre sempre em contato com a administração
          do site para o caso de problemas deste tipo.
        </p>

        <div className={`divGrid`}>
          <p className={`AlarmP`}>
            Debates são tratados como posts pequenos, logo eles não serão
            criados com imagens, mas links podem ser inclusos normalmente. Tenha
            isso em mente antes de fazer seu post.
          </p>
          <p className={`AlarmP`}>
            Debates aqui não são tachados com classificação indicativa, tenha
            cuidado com o que você vai ler. Em caso de questões muito sensíveis,
            entre em contato com a administração.
          </p>
          <p className={`AlarmP`}>
            Posts de debates com um tema muito pesado, teor sexual ou com um
            foco muito fora da linha da página serão excluídos sem aviso. Esteja
            ciente disso.
          </p>
        </div>
      </section>
      <div className={`RedDivider`}></div>
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
            </select>
          </div>
        </div>
        <NewPostButt>Criar Postagem</NewPostButt>
        <div className={styles.BackPostsGrid}>
          {modal && (
            <PostModal element={modal} type="DEBATE" setModal={setModal} />
          )}
          {filterPost.map((element, index) => {
            if (limit >= index) {
              return (
                <SinglePost
                  element={element}
                  index={index}
                  type={"DEBATE"}
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

export default DebatePost;
