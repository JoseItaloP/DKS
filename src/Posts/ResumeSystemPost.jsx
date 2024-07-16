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
    case 'Genero':
      return Docment.filter(
        (Post) => Post.GeS && Post.GeS.includes(search)
      );
      break;
    default:
      break;
  }
};

const ResumeSystemPost = () => {
  const { Resulmy, GetUpdate } = useFirebase();
  const [modal, setModal] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [Selected, setSelected] = React.useState("Name");
  const [limit, setLimit] = React.useState(5)
  let filterPost = GetFilter(search, Resulmy, Selected);

  useEffect(() => {
    GetUpdate("RESULMY");
  }, []);

  useEffect(()=>{
    const intersectionObserver = new IntersectionObserver((entries)=>{
      if(entries.some((entry)=> entry.isIntersecting)){
        setLimit((limitInsideState) => limitInsideState + 5)
      }
    })
    intersectionObserver.observe(document.querySelector('#sentinel'))

    return ()=>intersectionObserver.disconnect();
  }, [])

  return (
    <div className={`body`}>
      <Head tittle="Posts de Resulmo" />
      <section className={`sec `}>
        <h1 className={`tittle`}>Resumo de sistemas</h1>
        <p className={`paragrf`}>
          O lugar certo para procurar sistemas novos para sua mesa. Use o filtro
          adequadamente para procurar o sistema ideal. <br /> Você também pode
          fazer um <strong className={`strong`}>post</strong> e mostrar para
          todos os diferentes sistemas e porque usá-los. O ideal, e a principal
          ideia do site, é a divulgação de sistemas diferente de RPG,
          principalmente os mais 'underground' que poucos conhecem ou que são
          conhecidos, mas pouco usados. <br />
          <br />
          Você esta livre para escrever sobre qualquer sistema, mesmo os mais
          populares, mas tente sempre divulgar sistemas diferentes, sabemos que
          você pode tentar procurar por um sistema que conhece e ama e ver algum
          resumo não muito bom dele e queira fazer o próprio, ou até fazer um
          resumo e não ver se já a algum resumo deste sistema, saiba que você
          não será impedido de fazer isso, mas tente ao maximo evitar posts de
          sistemas repetidos.
        </p>
        <div className={`divGrid`}>
          <p className={`AlarmP`}>
            Não nos responsabilizamos por conteúdo explicito, caso algo assim
            ocorre entre em contato com a administração da página para análise e
            o abagamento do post e expulsão do seu criado.
          </p>
          <p className={`AlarmP`}>
            Tenha em mente que, ao postar um sistema próprio de sua autoria, ele
            pode ser usado como ganho para outros, nossa equipe não se
            responsabiliza por esses atos e nem com a proteção de seu sistema na
            página.
          </p>
          <p className={`AlarmP`}>
            A diversos sistemas na página e alguns dele são feitos para pessoas
            adultas e sãs de usa-los, então, saiba no que você está se metendo e
            garanta sempre que viu a classificação indicativa adequadamente.
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
              <option value="Genero">Genero</option>
            </select>
          </div>
        </div>
        <NewPostButt>Criar postagem</NewPostButt>
        <div className={styles.BackPostsGrid}>
          {modal && (
            <PostModal element={modal} type="RESULME" setModal={setModal} />
          )}
          {filterPost.map((element, index) => {
            if(limit >= index){
              return (<SinglePost
                element={element}
                index={index}
                type={"RESULME"}
                setModal={setModal}
              />)
            }
          })}
          <li id='sentinel' className={styles.LI}/>
        </div>
      </section>
    </div>
  );
};

export default ResumeSystemPost;
