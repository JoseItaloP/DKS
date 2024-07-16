import React, { useEffect } from "react";
import Input from "../Elements/Input";
import Button from "../Elements/Button";
import Head from "../helper/head";
import useLogin from "../Data/useLogin";
import useFirebase from "../Data/useFirebase";
import { useNavigate } from "react-router-dom";

import styles from "./styles/Registrate.module.css";

const Registrate = () => {
  const username = useLogin();
  const email = useLogin("email");
  const password = useLogin("password");
  const { CreatUser } = useFirebase();
  const nav = useNavigate();

  async function hamdleSubmit(evt) {
    evt.preventDefault();
    console.log(password)
    if (email.error || password.error ) {
      return alert(email.error ? email.error : password.error);
    } else {
      if (
        username.value.length === 0 ||
        email.value.length === 0 ||
        password.value.length === 0
      )
        return alert("Preencha todos os campos");
      else {
        const state = await CreatUser(
          email.value,
          username.value,
          password.value
        );
        if (state === "ok") return nav("/");
        else if (state === "name") return alert("Username já cadastrado");
        else if (state === "email") return alert("Email já cadastrado");
        else if (state === "password") return alert("Senha já cadastrado");
      }
    }
  }

  return (
    <>
      <Head tittle="Registrar" />
      <div className={styles.center}>
        <h1 className="tittle">Registrar</h1>
        <form className={styles.form} onSubmit={hamdleSubmit}>
          <Input
            label="Nome de Usuario"
            type="text"
            name="username"
            {...username}
          />
          <Input
            label="Email do Usuario"
            type="email"
            name="email"
            {...email}
          />
          <Input label="Senha" type="password" name="password" {...password} />
          <Button>Enviar</Button>
        </form>
      </div>
    </>
  );
};

export default Registrate;
