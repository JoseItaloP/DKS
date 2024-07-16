import React from "react";
import useLogin from "../Data/useLogin";
import { IoIosClose } from "react-icons/io";
import Input from "../Elements/Input";
import Button from "../Elements/Button";
import useFirebase from "../Data/useFirebase";
import { Link } from "react-router-dom";

import styles from "./styles/Enter.module.css";

const Enter = ({ status }) => {
  const username = useLogin();
  const password = useLogin("password");
  const [show, setShow] = React.useState(status);
  const { LoginUser } = useFirebase();
  useLogin.valor = status;

  function hamdleSubmit() {
    if (username.validate() && password.validate()) {
      LoginUser(username.value, password.value);
    }
  }

  return (
    <>
      {show ? (
        <div className={`${styles.back} puffInCenter`}>
          <section className={`littleFlexCenter ${styles.center} `}>
            <div className={styles.topDiv}>
              <h1 className="tittle">Login</h1>
              <IoIosClose onClick={() => setShow(false)} />
            </div>
            <form className={`${styles.form}`} onSubmit={hamdleSubmit}>
              <Input
                type="text"
                label="Usuario"
                name="username"
                {...username}
              />
                <Input
                  type='password'
                  label="Senha"
                  name="password"
                  {...password}
                />
                
              <Button> Entrar </Button>
              <Link
                className={styles.Link}
                to="/CriarConta"
                onClick={() => setShow(false)}
              >
                Cadastre-se Aqui
              </Link>
            </form>
          </section>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Enter;
