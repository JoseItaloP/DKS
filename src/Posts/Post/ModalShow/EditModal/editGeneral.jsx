import React, { useEffect } from "react";
import useFirebase from "../../../../Data/useFirebase";
import Button from "../../../../Elements/Button";
import Input from "../../../../Elements/Input";
import JoditEditorText from "../../../../Elements/JoditEditorText";
import FileInput from "../../../../Elements/FileInput";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./styles/DefaultEdit.module.css";

const editGeneral = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const {
    imgUrl,
    General,
    user,
    progress,
    NewPhoto,
    CancelNewPhoto,
    GetUpdate,
    UpdateGeneralPost,
    setImgUrl,
    setProgress,
  } = useFirebase();
  const LocalS = localStorage.getItem("Logged");
  const [Logged, setLogged] = React.useState("");
  const [show, setShow] = React.useState(true);
  const [erro, setErro] = React.useState("");
  const [joditContent, setJoditContent] = React.useState("");
  const [value, setValue] = React.useState({
    Id: "NewRulePost",
    TituloP: "",
    GeneralTxT: "",
    UserId: LocalS,
    UserName: "",
    ImgUrl: "",
  });

  useEffect(() => {
    GetUpdate("GENERAL");
    General.map((element) => {
      if (element.id === id) {
        setValue({
          Id: "NewGeneralPost",
          TituloP: element.TituloP,
          GeneralTxT: element.GeneralTxT,
          UserId: LocalS,
          UserName: element.UserName,
          ImgUrl: element.ImgUrl,
        });
        setJoditContent(element.GeneralTxT);
        if (element.ImgUrl) {
          setImgUrl(element.ImgUrl);
          setShow(false);
        }
      }
    });
  }, [id, General]);

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
    if (progress === 100) {
      setShow(false);
      setProgress(0);
    }
  }, [progress]);

  useEffect(() => {
    if (joditContent) {
      setValue((prevValue) => ({
        ...prevValue,
        GeneralTxT: joditContent,
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
    if (!value.TituloP | !value.GeneralTxT ) {
      return setErro("Preencha todos os Campo");
    }
    if (!Logged) {
      return alert("Faça login na página para continuar");
    }
    setValue((prevValue) => ({
      ...prevValue,
      GeneralTxT: joditContent,
    }));
    UpdateGeneralPost(value.TituloP, value.GeneralTxT,  value.ImgUrl, id);
    navigate("/DKS/Post/GeneralPost");
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
          Editar Post Geral
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

export default editGeneral;
