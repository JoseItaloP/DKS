import React, { useEffect } from "react";
import Logo from "./Logo";
import Head from "./helper/head";
import { useNavigate } from "react-router-dom";

import styles from "./styles/Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={`body`}>
        <Head tittle="Home" />
        <section className={`sec littleFlexCenter`}>
          <h1 className="tittle">
            Bem vindo ao{" "}
            <stronge className={styles.destaque}>Do you know a system?</stronge>
          </h1>
          <h2>Conhecido, como:</h2>
          <Logo />
          <h3 className={styles.SecDestaque}>
            Um blog, forum ou qualquer coisa que se encaixe aqui!
          </h3>
        </section>

        <section className={`${styles.gridDivde} sec`}>
          <div>
            <h2>Qual o objetivo do site?</h2>
            <p>
              Queremos criar uma plataforma em que você possa deixar suas ideias
              sobre o maior número possível de sistemas de RPG (Role playing
              game), com resumos, regras e debates, para quem quer fujir do
              padrão D&D de linha e explorar novas ideias.
            </p>
          </div>
          <div>
            <h2>Divulgaremos sistemas de forma pirata?</h2>
            <p>
              Não! O intuito do grupo é a penas o debate, os sistemas podem ser
              achados na internet afora, mas não aqui. Qualquer material que
              tenha sido divulgado de forma gratuita ou caso um mestre escritor
              queira divulgar seu sistema próprio, sera permitido, com os links
              apropriados. A equipe do DKS não se responsabiliza com links
              externos suspeitos ou perda de sistemas próprios, para qualquer
              dúvida, reclamação ou alerta, entre em contato abaixo.
            </p>
          </div>
        </section>

        <h2 className={styles.Tiph2}>Tipos de postagens</h2>
        <section className={`sec ${styles.TipSis} `}>
          <div onClick={() => navigate("/DKS/Post/ResumeSystemPost")}>
            <h3>Resumo de sistemas</h3>
            <p>
              Pequenos resumos de sistemas diversos, poste aqui sistemas
              diferentes que você acha que todos deveriam conhecer!
            </p>
          </div>
          <div onClick={() => navigate("/DKS/Post/DebatePost")}>
            <h3>Debates</h3>
            <p>
              Crie aqui um post menor com um foco em debater uma questão que
              você teve! Gere intrigas, questionamentos e divulgue opniões, mas
              nao saia do foco do grupo, o RPG de mesa.
            </p>
          </div>
          <div onClick={() => navigate("/DKS/Post/RulePost")}>
            <h3>Regras de sistemas</h3>
            <p>
              Tem alguma duvida entre os varios sistema de RPG que achou e não
              consegue encontrar em lugar nenhum uma resposta? Divulgue ela
              aqui, talvez alguma das grandes mentes do site possa li ajudar com
              isso.
            </p>
          </div>
          <div onClick={() => navigate("/DKS/Post/GeneralPost")}>
            <h3>Posts gerais</h3>
            <p>
              Sua ideia não se encaixa em nenhuma das categorias passadas?
              Talvez algum questionamento sobre algum sistema ou algo
              relacionado a uma "lore" de um dos vastos universos? Pode mandar
              ela aqui!
            </p>
          </div>
        </section>
        <footer className={styles.footer}>
          <p>Projeto feito Por José Italo</p>
          <p>Redes para contato:</p>
          <ul>
            <li>
              <a href="www.linkedin.com/in/josé-italo">Linkedin</a>
            </li>
            <li>
              <a href="https://github.com/JoseItaloP">GitHub</a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
};

export default Home;
