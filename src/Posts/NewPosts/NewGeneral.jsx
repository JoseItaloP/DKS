import React, { useEffect } from "react";
import Input from "../../Elements/Input";
import Button from "../../Elements/Button";
import useNewPost from "../../Data/useNewPost";
import useFirebase from "../../Data/useFirebase";

import styles from "./styles/Default.module.css";
import FileInput from "../../Elements/FileInput";

const NewGeneral = () => {

  const { progress, imgUrl, Logged, NewPhoto, CancelNewPhoto } = useFirebase();
  const [value, setValue] = React.useState({
    Id: "NewGeneralPost",
    TituloP: "",
    GeneralTxT: "",
    UserId: LocalS,
    UserName: "",
    ImgUrl: '',
  });
  const [erro, setErro] = React.useState("");
  const { newElement } = useNewPost();
  const [show, setShow] = React.useState(true)
  const [imgFileUrl, setImgFileUrl] = React.useState('')


  useEffect(() => {
    if (Logged) {
      setValue((prevValue) => ({
        ...prevValue,
        UserName: Logged,
      }));
    }
  }, [Logged]);

  useEffect(()=>{
      if(imgUrl) {
        setImgFileUrl(imgUrl)
      }
  }, [imgUrl])

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
    setValue((prevValue) => ({
      ...prevValue,
      ImgUrl: imgFileUrl,
    }));
    newElement(value);
  }

  function SendIMG(evt){
    evt.preventDefault()
    setShow(false)

    const file = evt.target[0]?.files[0];
    if (!file) return;
    if (file) NewPhoto(file);
    
  }

  function CancelIMG(){
    CancelNewPhoto();
    setShow(true);
    setImgFileUrl('')
  }

  return (
    <>
      <div className={styles.body}>
        <h1 className="tittle">Novo Post Geral</h1>
          <div className="littleFlexCenter">
            <form className="littleFlexCenter" onSubmit={SendIMG}>
              <FileInput label='Coloque uma imagem no post' Id={`General_Post_${imgUrl}`} name={imgUrl} />
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
