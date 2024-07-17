import React, { useEffect } from "react";
import Input from "../../Elements/Input";
import Button from "../../Elements/Button";
import FileInput from "../../Elements/FileInput";
import useFirebase from "../../Data/useFirebase";
import useNewPost from "../../Data/useNewPost";
import JoditEditorText from "../../Elements/JoditEditorText";

import styles from "./styles/Default.module.css";

const NewRule = () => {
  const { imgUrl, user, progress, NewPhoto, CancelNewPhoto } = useFirebase();
  const LocalS = localStorage.getItem("Logged");
  const [Logged, setLogged] = React.useState("");
  const [show, setShow] = React.useState(true);
  const [erro, setErro] = React.useState("");
  const [joditContent, setJoditContent] = React.useState("");
  const [value, setValue] = React.useState({
    Id: "NewRulePost",
    TituloP: "",
    RuleTxT: "",
    SyR: "",
    UserId: LocalS,
    UserName: "",
    ImgUrl: "",
  });
  const { newElement } = useNewPost();

  useEffect(() => {
    if (user) {
      const foundUser = user.find((element) => element.id === LocalS);
      if (foundUser) setLogged(foundUser.name);
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

  useEffect(() => {
    const callToValue = () => {
      setValue((prevValue) => ({
        ...prevValue,
        ImgUrl: imgUrl,
      }));
    };
    if (imgUrl) {
      callToValue();
    }
  }, [imgUrl]);

  useEffect(() => {
    if (joditContent) {
      setValue((prevValue) => ({
        ...prevValue,
        RuleTxT: joditContent,
      }));
    }
  }, [joditContent]);

  function hamdleChange({ target }) {
    const { id, value } = target;
    setValue((prevSatate) => ({
      ...prevSatate,
      [id]: value,
    }));
  }

  function hamdleSubmit(evt) {
    evt.preventDefault();
    if (!value.TituloP | !value.RuleTxT | !value.SyR) {
      return setErro("Preencha todos os Campo");
    }
    if (!Logged) {
      return alert("Faça login na página para continuar");
    }
    newElement(value);
  }

  function SendIMG(evt) {
    evt.preventDefault();
    setShow(false);

    if (value.TituloP) {
      const file = evt.target[0]?.files[0];
      if (!file) return;
      if (file) NewPhoto(file, `${value.TituloP}_${user.id}`);
    } else {
      window.alert("Preencha o titulo do post para proceguir");
    }
  }

  function CancelIMG() {
    CancelNewPhoto();
    setShow(true);
  }
  return (
    <>
      <div className={`${styles.body} ${styles.body2}`}>
        <h1 className={` tittle ${styles.colorDefault}`}>
          Novo Post de Regra de Sistema
        </h1>
        <div className="littleFlexCenter">
          <form className="littleFlexCenter" onSubmit={SendIMG}>
            {show && (
              <FileInput
                label="Coloque uma imagem no post"
                Id={`General_Post_${imgUrl}`}
                name={imgUrl}
                className={styles.colorDefault}
              />
            )}
            {!imgUrl && (
              <progress value={progress} max="100" className="progressBar" />
            )}
            {imgUrl && (
              <img
                src={imgUrl}
                alt={`${Logged}_Post_Photo`}
                className="ImagePost"
              />
            )}
            {show && <Button>Ver Imagem</Button>}
          </form>
          {show ? "" : <Button onClick={CancelIMG}>Cancelar</Button>}
        </div>
        <form className={styles.form} onSubmit={hamdleSubmit}>
          <Input
            label="Titulo do Post"
            type="text"
            name="TituloP"
            onChange={hamdleChange}
            className={styles.colorDefault}
          />
          <Input
            label="Sistema em Questão"
            type="text"
            name="SyR"
            onChange={hamdleChange}
            className={styles.colorDefault}
          />
          <JoditEditorText
            content={joditContent}
            onBlur={(newContent) => setJoditContent(newContent)}
          />
          {/* <textarea
            id="RuleTxT"
            name="RuleTxT"
            placeholder="Preencha a caixa de texto do post"
            rows="10"
            cols="70"
            onChange={hamdleChange}
          /> */}
          <Button>Enviar</Button>
          {erro ? erro : ""}
        </form>
      </div>
    </>
  );
};

export default NewRule;
