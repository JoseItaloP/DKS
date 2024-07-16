import React, { useCallback, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Button from "../../../Elements/Button";
import { SlArrowDown } from "react-icons/sl";
import Coments from "./Coments";
import useFirebase from "../../../Data/useFirebase";

import styles from "./styles/Default.module.css";

const ResumeSModal = ({ element }) => {
  const navigate = useNavigate();
  const {
    NewComentOnPost,
    GetUpdate,
    DeleteSinglePost,
    Resulmy,
    Logged,
    LocalId,
  } = useFirebase();
  const [htmString, setHtmlString] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [newComent, setNewComent] = React.useState("");
  const [comentts, setComentts] = React.useState([]);
  const idElement = element.id;
  const navRef = useRef();
  const Editavel = element.UserName === Logged ? true : false;

  React.useEffect(() => {
    const AttCom = (value) => {
      setComentts(value || []);
    };
    GetUpdate("RESULMY");
    Resulmy.map((Relement) => {
      if (Relement.id === element.id) {
        AttCom(Relement.Coments);
      }
    });
  }, [Resulmy, show]);

  React.useEffect(() => {
    const fetchHtml = `${element.ResumeTxT}`;
    setHtmlString(fetchHtml);
  }, [element.ResumeTxT]);

  const DeletePost = () => {
    if (window.confirm("Deseja deletar este Post?")) {
      console.log(element.id);
      DeleteSinglePost(element.id, "ResulmySystem");
    }
  };

  const showNavBar = () => {
    navRef.current.classList.toggle(`${styles.responsiveBar}`);
  };

  const EditPost = () => {
    if (window.confirm("Deseja editar o Post?")) {
      navigate(`editResulme/${element.id}`);
    }
  };

  function NewComent() {
    if (!Logged) {
      return alert("Faça login na página para continuar");
    }
    const CompleteComent = {
      name: Logged,
      UserId: LocalId,
      ElementId: idElement,
      Coment: newComent,
      timestamp: new Date(),
    };
    NewComentOnPost(CompleteComent, "ResulmySystem", element.id);
    setComentts((prevComents) => [...prevComents, CompleteComent]);
    setNewComent("");
  }

  return (
    <>
      <div className={styles.BackDiv}>
        <div className={styles.TransformeDiv}>
          <div className={styles.BodyDiv}>
            {Editavel && (
              <div className={styles.topOne}>
                <nav ref={navRef} className={styles.NavItSelf}>
                  <ul className={styles.NavDivider}>
                    <li onClick={EditPost}>Editar</li>
                    <li onClick={DeletePost}>Deletar</li>
                  </ul>
                </nav>
                <button className={`${styles.navBtn}`} onClick={showNavBar}>
                  <BsThreeDots />
                </button>
              </div>
            )}
            {element.ImgUrl && (
              <div className={styles.imgSide}>
                {" "}
                <img src={element.ImgUrl} alt="" />{" "}
              </div>
            )}
            <section className={styles.TopSec}>
              <h1>{element.TituloP}</h1>
              <div className={styles.NameIndcation}>
                <h5>By: {element.UserName} </h5>
                <p> | </p>
                <h6>
                  Sistema:{" "}
                  <strong className={"CI" + element.CI}>{element.CI}</strong>
                </h6>
              </div>
              <h6>Genero: {element.GeS}</h6>
            </section>
            <section className={styles.BodySec}>
              <div dangerouslySetInnerHTML={{ __html: htmString }} />
            </section>
          </div>
        </div>
        <div className={`${styles.BackComents} `}>
          {show ? (
            <button
              className={`${styles.RedButtao} 
  `}
              onClick={() => setShow(false)}
            >
              <SlArrowDown />
            </button>
          ) : (
            <button className={styles.Buttao} onClick={() => setShow(true)}>
              Comentarios
            </button>
          )}
          {show && (
            <div
              className={`${styles.ComentsBox} 
  `}
            >
              <div className={styles.Coments}>
                {comentts.map((coment, index) => (
                  <Coments coment={coment} index={index} type={"ResulmySystem"} />
                ))}
              </div>

              <div className={styles.newComent}>
                <textarea
                  name="Coment"
                  id="Coment"
                  rows="4"
                  cols="50"
                  placeholder="Comente Aqui"
                  value={newComent}
                  onChange={(e) => setNewComent(e.target.value)}
                />
                <Button onClick={NewComent}>Comentar</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResumeSModal;
