import React, { useEffect, useState } from "react";
import useFirebase from "../../../../Data/useFirebase";
import Input from "../../../../Elements/Input";
import Button from "../../../../Elements/Button";
import JoditEditorText from "../../../../Elements/JoditEditorText";

import styles from "./styles/DefaultEdit.module.css";

import { useNavigate, useParams } from "react-router-dom";

const editDebate = () => {
  const id = useParams().id;
  const LocalS = localStorage.getItem("Logged");
  const [Logged, setLogged] = useState("");
  const [joditContent, setJoditContent] = React.useState("");
  const { user, Debate, UpdateDebatePost, GetUpdate } = useFirebase();
  const [value, setValue] = useState({
    Id: "NewDebatePost",
    UserId: LocalS,
    TituloP: "",
    DebateTxT: "",
    UserName: "",
  });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    GetUpdate("DEBATE");
    Debate.map((element) => {
      if (element.id === id) {
        setValue({
          Id: "NewResumePost",
          TituloP: element.TituloP,
          DebateTxT: element.DebateTxT,
          UserName: element.UserName,
        });
        setJoditContent(element.DebateTxT);
      }
    });
  }, [id, Debate]);

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
    UpdateDebatePost(
      value.TituloP,
      value.DebateTxT,
      id
    );
    navigate("/Post/DebatePost");
  };

  return (
    <div className={styles.body}>
      <h1 className={`tittle ${styles.colorDefault}`}>Edit Post de Debate</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Titulo do Post"
          type="text"
          name="TituloP"
          value={value.TituloP}
          className={styles.colorDefault}
          onChange={handleChange}
        />
        <JoditEditorText
          content={joditContent}
          onBlur={(newContent) => setJoditContent(newContent)}
        />
        <Button>Enviar</Button>
        {erro && <p>{erro}</p>}
      </form>
    </div>
  );
};

export default editDebate;
