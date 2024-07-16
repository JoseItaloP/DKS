import React, { useEffect, useState } from "react";
import Input from "../../Elements/Input";
import Button from "../../Elements/Button";
import styles from "./styles/Default.module.css";
import useNewPost from "../../Data/useNewPost";
import useFirebase from "../../Data/useFirebase";

const NewDebate = () => {
  const LocalS = localStorage.getItem("Logged");
  const [Logged, setLogged] = useState('');
  const { user } = useFirebase();
  const [value, setValue] = useState({
    Id: "NewDebatePost",
    UserId: LocalS,
    TituloP: "",
    DebateTxT: "",
    UserName: "",
  });
  const [erro, setErro] = useState("");
  const { newElement } = useNewPost();

  useEffect(() => {
    if (user) {
      const foundUser = user.find((element) => element.id === LocalS);
      if (foundUser) {
        setLogged(foundUser.name);
      }
    }
  }, [user, LocalS]);

  useEffect(() => {
    if (Logged) {
      setValue((prevValue) => ({
        ...prevValue,
        UserName: Logged,
      }));
    }
  }, [Logged]);

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setValue((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!value.TituloP || !value.DebateTxT) {
      return setErro("Preencha todos os campos");
    }
    if (!Logged) {
      return alert("Faça login na página para continuar");
    }
    newElement(value);
  };

  return (
    <div className={styles.body}>
      <h1 className="tittle">Novo Post de Debate</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Titulo do Post"
          type="text"
          name="TituloP"
          onChange={handleChange}
        />
        <textarea
          id="DebateTxT"
          name="DebateTxT"
          placeholder="Preencha a caixa de texto do post"
          rows="10"
          cols="70"
          onChange={handleChange}
        />
        <Button>Enviar</Button>
        {erro && <p>{erro}</p>}
      </form>
    </div>
  );
};

export default NewDebate;
