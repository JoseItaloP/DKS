import React, { useEffect } from "react";
import useFirebase from "../../../../Data/useFirebase";
import Button from "../../../../Elements/Button";
import Input from "../../../../Elements/Input";
import JoditEditorText from "../../../../Elements/JoditEditorText";
import FileInput from "../../../../Elements/FileInput";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./styles/DefaultEdit.module.css";

const editRule = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const {
    imgUrl,
    Rule,
    user,
    progress,
    NewPhoto,
    CancelNewPhoto,
    GetUpdate,
    UpdateRulePost,
    setImgUrl,
    setProgress,
  } = useFirebase();
  const LocalS = localStorage.getItem("Logged");
  const [Logged, setLogged] = React.useState("");
  const [show, setShow] = React.useState(true);
  const [urlDnv, setUrlDnv] = React.useState("");
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

  useEffect(() => {
    GetUpdate("RULE");
    Rule.map((element) => {
      if (element.id === id) {
        setValue({
          Id: "NewRulePost",
          TituloP: element.TituloP,
          RuleTxT: element.RuleTxT,
          SyR: element.SyR,
          UserId: LocalS,
          UserName: element.UserName,
          ImgUrl: element.ImgUrl,
        });
        setJoditContent(element.RuleTxT);
        if (element.ImgUrl) {
          setImgUrl(element.ImgUrl);
          setShow(false);
        }
      }
    });
  }, [id, Rule]);

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
      if (urlDnv) setUrlDnv("");
    };
    if (imgUrl) {
      callToValue();
    }
  }, [imgUrl, urlDnv]);

  useEffect(() => {
    if (progress === 100) {
      setShow(false);
      setProgress(0);
    }
  }, [progress]);

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
    UpdateRulePost(value.TituloP, value.RuleTxT, value.SyR, value.ImgUrl, id);
    navigate("/Post/RulePost");
  }

  function SendIMG(evt) {
    evt.preventDefault();
    setShow(false);

    const file = evt.target[0]?.files[0];
    if (!file) return;
    if (file) NewPhoto(file);
  }

  function CancelIMG() {
    CancelNewPhoto();
    setValue((prevValue) => ({
      ...prevValue,
      ImgUrl: '',
    }));
    setShow(true);
  }

  return (
    <>
      <div className={styles.body}>
        <h1 className={` tittle ${styles.colorDefault}`}>
          Editar Post de Regra de Sistema
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
            value={value.TituloP}
            onChange={hamdleChange}
            className={styles.colorDefault}
          />
          <Input
            label="Sistema em Questão"
            type="text"
            name="SyR"
            value={value.SyR}
            onChange={hamdleChange}
            className={styles.colorDefault}
          />
          <JoditEditorText
            content={joditContent}
            onBlur={(newContent) => setJoditContent(newContent)}
          />
          <Button>Enviar</Button>
          {erro ? erro : ""}
        </form>
      </div>
    </>
  );
};

export default editRule;
