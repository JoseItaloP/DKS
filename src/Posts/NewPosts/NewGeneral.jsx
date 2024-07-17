import React, { useEffect } from "react";
import Input from "../../Elements/Input";
import Button from "../../Elements/Button";
import useNewPost from "../../Data/useNewPost";
import useFirebase from "../../Data/useFirebase";
import FileInput from "../../Elements/FileInput";

import styles from "./styles/Default.module.css";

const NewGeneral = () => {

  const { progress, imgUrl, LocalId, Logged, NewPhoto, CancelNewPhoto } = useFirebase();
  const [value, setValue] = React.useState({
    Id: "NewGeneralPost",
    TituloP: "",
    GeneralTxT: "",
    UserId: LocalId,
    UserName: "",
    ImgUrl: '',
  });
  const [erro, setErro] = React.useState("");
  const { newElement } = useNewPost();
  const [show, setShow] = React.useState(true)


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

  function hamdleChange({ target }) {
    const { id, value } = target;
    setValue((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  function hamdleSubmit(evt) {
    evt.preventDefault();
    if (!value.TituloP | !value.GeneralTxT) {
      return setErro("Preencha todos os Campo");
    }
    if (!Logged) {
      return alert("Faça login na página para continuar");
    }
    newElement(value);
  }

  function SendIMG(evt){
    evt.preventDefault()
    setShow(false)

    if (value.TituloP) {
      const file = evt.target[0]?.files[0];
      if (!file) return;
      if (file) NewPhoto(file, `${value.TituloP}_${user.id}`);
    } else {
      window.alert("Preencha o titulo do post para proceguir");
    }
    
  }

  function CancelIMG(){
    CancelNewPhoto();
    setShow(true);
  }

  return (
    <>
      <div className={`${styles.body} ${styles.body2}`}>
        <h1 className={`tittle ${styles.colorDefault}`}>Novo Post Geral</h1>
          <div className="littleFlexCenter">
            <form className="littleFlexCenter" onSubmit={SendIMG}>
              <FileInput label='Coloque uma imagem no post' Id={`General_Post_${imgUrl}`} name={imgUrl} className={styles.colorDefault} />
              {!imgUrl && <progress value={progress} max="100" className='progressBar'/>}
              {imgUrl && <img src={imgUrl} alt={`${Logged}_Post_Photo`} className='ImagePost'/>}
              {show && <Button>Ver Imagem</Button>}
            </form>
            {show ? '' : <Button onClick={CancelIMG}>Cancelar</Button>}
          </div>
        <form className={styles.form} onSubmit={hamdleSubmit}>
          <Input
            label="Titulo do Post"
            type="text"
            name="TituloP"
            onChange={hamdleChange}
            className={styles.colorDefault}
          />
          <textarea
            id="GeneralTxT"
            name="GeneralTxT"
            placeholder="Preencha a caixa de texto do post"
            rows="10"
            cols="70"
            onChange={hamdleChange}
          />
          <Button>Enviar</Button>
          {erro ? erro : ""}
        </form>
      </div>
    </>
  );
};

export default NewGeneral;
