import React from "react";
import Button from "../../Elements/Button";
import { useNavigate } from "react-router-dom";
import Head from '../../helper/head'

import styles from "./styles/Default.module.css";

const NewPost = () => {
  const [selected, setSelected] = React.useState("");
  const Navigate = useNavigate();

  function hamdleSubmit(evt) {
    evt.preventDefault();
    switch (selected) {
      case "ResumoDeSistemas":
        Navigate("NewResume");
        break;
      case "Debates":
        Navigate("NewDebate");
        break;
      case "Regrasdesistemas":
        Navigate("NewRule");
        break;
      case "PostsGerais":
        Navigate("NewGeneral");
        break;
      default:
        return alert(
          "Selecione uma caixa abaixo para procesguir"
        );
    }
  }

  return (
    <>
      <Head tittle='Novo Post' />
      <div className={`${styles.body} ${styles.colorDefault} ${styles.body2}`}>
        <h1 className="tittle">Qual o timpo de Post?</h1>
        <form className={styles.form} onSubmit={hamdleSubmit}>
          <ul>
            <li>
              <label>
                <input
                  type="radio"
                  name="Posts"
                  id="ResumoDeSistemas"
                  value="ResumoDeSistemas"
                  onClick={({ target }) => setSelected(target.value)}
                />
                Resumo de sistemas
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="Posts"
                  id="Debates"
                  value="Debates"
                  onClick={({ target }) => setSelected(target.value)}
                />
                Debates
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="Posts"
                  id="Regrasdesistemas"
                  value="Regrasdesistemas"
                  onClick={({ target }) => setSelected(target.value)}
                />
                Regras de sistemas
              </label>
            </li>
            <li>
              <label>
                <input
                  type="radio"
                  name="Posts"
                  id="PostsGerais"
                  value="PostsGerais"
                  onClick={({ target }) => setSelected(target.value)}
                />
                Posts Gerais
              </label>
            </li>
          </ul>
          <Button>Proceguir</Button>
        </form>
      </div>
    </>
  );
};

export default NewPost;
