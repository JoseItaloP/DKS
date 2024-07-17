import React from "react";
import useLogin from "../Data/useLogin";
import { IoIosClose } from "react-icons/io";
import useFirebase from "../Data/useFirebase";
import Input from "../Elements/Input";
import Button from "../Elements/Button";
import FileInput from "../Elements/FileInput";

import styles from "./styles/UserPage.module.css";

const UserPage = ({ status }) => {
  const [show, setShow] = React.useState(status);
  const [confirm, setConfirm] = React.useState(false);
  const newUserName = useLogin();
  useLogin.valor = status;
  const {
    user,
    progress,
    imgUrl,
    UpdateNewUser,
    NewPhoto,
    updatePhoto,
    CancelNewPhoto,
    setImgUrl,
  } = useFirebase();
  let NameUser;
  const LocalId = localStorage.getItem("Logged");

  function ImgSubmit(evt) {

    evt.preventDefault();
    const file = evt.target[0]?.files[0];
      if(file){
        if (confirm) {
          setConfirm(false);
          updatePhoto(LocalId, imgUrl);
          
        } else {
          setConfirm(true);
          if (!file) return;
          if (file) NewPhoto(file, `${NameUser}_Profile`);
        }
      } else{
        return window.alert('É necessario uma imagem para prosseguir')
      }
    
  }

  function CancelNewImg() {
    CancelNewPhoto();
    setImgUrl('')
    setConfirm(false);
  }

  function Deslogar() {
    localStorage.removeItem("Logged");
    location.reload()
  }

  return (
    <>
      {user.map((element) => {
        if (element.id === LocalId) {
          NameUser = element.name;
        }
      })}
      {show ? (
        <div className={`${styles.back} puffInCenter`}>
          <section className={`littleFlexCenter ${styles.center}`}>
            <div className={styles.topDiv}>
              <h1 className={`tittle ${styles.Uper}`}>{NameUser}</h1>
              <IoIosClose onClick={() => setShow(false)} />
            </div>
            <div className={styles.forms}>
              <div className={styles.formElement}>
                <Input
                  type="text"
                  name="newUser"
                  placeholder="Mudar o Username?"
                  className={styles.InputText}
                  {...newUserName}
                />
                <Button
                  onClick={() => UpdateNewUser(newUserName.value, LocalId)}
                >
                  Enviar
                </Button>
              </div>
              <form onSubmit={ImgSubmit} className="littleFlexCenter">
                <FileInput
                  label="Coloque uma nova foto de perfil"
                  Id={LocalId}
                  name={`${NameUser}_Profile`}
                />

                {!imgUrl && (
                  <progress
                    value={progress}
                    max="100"
                    className="progressBar"
                  />
                )}
                {imgUrl && (
                  <img
                    src={imgUrl}
                    alt={`${NameUser} Photo`}
                    className="ImageSend"
                  />
                )}
                {confirm ? <Button>Confrimar</Button> : <Button>Enviar</Button>}
              </form>
              {confirm ? (
                <Button
                  className={`littleFlexCenter ${styles.CancelBtt}`}
                  onClick={CancelNewImg}
                >
                  Cancelar
                </Button>
              ) : (
                ""
              )}

              <Button onClick={Deslogar} className={styles.DeslogButt}>
                Deslogar
              </Button>
            </div>
          </section>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UserPage;
