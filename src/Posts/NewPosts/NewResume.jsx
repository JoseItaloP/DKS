import React, { useEffect } from "react";
import Input from "../../Elements/Input";
import Button from "../../Elements/Button";
import FileInput from "../../Elements/FileInput";
import useFirebase from "../../Data/useFirebase";
import useNewPost from "../../Data/useNewPost";
import JoditEditorText from "../../Elements/JoditEditorText";

import styles from './styles/Default.module.css'

const NewResume = () => {
  const { imgUrl, user, progress, setProgress, NewPhoto, CancelNewPhoto } =
    useFirebase();
  const LocalS = localStorage.getItem("Logged");
  const [Logged, setLogged] = React.useState("");
  const [joditContent, setJoditContent] = React.useState("");
  const [show, setShow] = React.useState(true);
  const [erro, setErro] = React.useState("");
  const [imgFileUrl, setImgFileUrl] = React.useState("");
  const [urlDnv, setUrlDnv] = React.useState("");
  const [value, setValue] = React.useState({
    Id: "NewResumePost",
    TituloP: "",
    ResumeTxT: "",
    CI: "",
    GeS: "",
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
      setImgFileUrl(imgUrl);
      setValue((prevValue) => ({
        ...prevValue,
        ImgUrl: imgFileUrl,
      }));
      if (urlDnv) setUrlDnv("");
    };
    if (imgUrl) {
      callToValue();
    }
  }, [imgUrl, urlDnv]);

  useEffect(() => {
    if (joditContent) {
      setValue((prevValue) => ({
        ...prevValue,
        ResumeTxT: joditContent,
      }));
    }
  }, [joditContent]);

  useEffect(() => {
    if (progress === 100) {
      setShow(false);
      setProgress(0);
    }
  }, [progress]);

  function hamdleChange({ target }) {
    const { id, value } = target;
    setValue((prevSatate) => ({
      ...prevSatate,
      [id]: value,
    }));
  }

  function SendIMG(evt) {
    evt.preventDefault();

    const file = evt.target[0]?.files[0];
    if (!file) return;
    if (file) NewPhoto(file);
  }

  function CancelIMG() {
    CancelNewPhoto();
    setShow(true);
    setImgFileUrl("");
  }

  async function hamdleSubmit(evt) {
    evt.preventDefault();

    if (
      !value.TituloP |
      !value.ResumeTxT |
      !value.CI |
      !value.GeS |
      value.ImgUrl
    ) {
      return setErro("Preencha todos os Campo");
    }
    if (!Logged) {
      return alert("Faça login na página para continuar");
    }
    setUrlDnv("1");
    newElement(value);
  }

  return (
    <>
      <div className={styles.body}>
        <h1 className={`tittle ${styles.colorDefault}`}>
          Novo Resumo de sistema
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
          <div>
            <label htmlFor="CI" className={styles.colorDefault}>
              Classificação Indicativa para o sistema
            </label>
            <select
              name="CI"
              id="CI"
              className={styles.selec}
              onChange={hamdleChange}
              required
            >
              <option value="" selected>
                ESCOLHA
              </option>
              <option value="L">L</option>
              <option value="10">10</option>
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="18">18</option>
            </select>
          </div>
          <Input
            label="Genero do Sistema"
            type="text"
            name="GeS"
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

export default NewResume;
