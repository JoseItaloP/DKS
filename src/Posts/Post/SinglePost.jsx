import React from "react";

import styles from "./styles/Default.module.css";
import { useNavigate } from "react-router-dom";

const SinglePost = ({ element, index, type, setModal }) => {
  const navigate = useNavigate();
  const [htmString, setHtmlString] = React.useState("");

  React.useEffect(() => {
   if(type){switch(type){
      case "RESULME":
        const ResumyHtml = `${element.ResumeTxT}`;
        setHtmlString(ResumyHtml);
        break;
      case "DEBATE":
        const DebateHtml = `${element.DebateTxT}`;
        setHtmlString(DebateHtml);
        break;
      case "RULE":
        const RuleHtml = `${element.RuleTxT}`;
        setHtmlString(RuleHtml);
        break;
    case "GENERAL":
        const GeneralHtml = `${element.GeneralTxT}`;
        setHtmlString(GeneralHtml);
        break;
    }}
  }, [type]);

  

  switch (type) {
    case "RESULME":
      return (
        <div className={`${styles.BlockPost} AnimationCenter`} key={element.id} onClick={()=> setModal(element)}>
          {element.ImgUrl ? (
            <div className={styles.divImg}>
              <img src={element.ImgUrl} className={styles.ImgPost} />
            </div>
          ) : (
            <div className={styles.divNonImg}> </div>
          )}
          <section>
            <h1>{element.TituloP}</h1>
            <h5>{element.UserName}</h5>
            <h5>{element.GeS}</h5>
          </section>
          <h3>
            Categoria Indicativa:{" "}
            <strong className={"CI" + element.CI}>{element.CI}</strong>
          </h3>
          <p><div dangerouslySetInnerHTML={{ __html: htmString }} /> </p>
        </div>
      );
      break;
    case "RULE":
      return (
        <div className={`${styles.BlockPost} AnimationCenter`} key={element.id} onClick={()=> setModal(element)}>
          {element.ImgUrl ? (
            <div className={styles.divImg}>
              <img src={element.ImgUrl} className={styles.ImgPost} />
            </div>
          ) : (
            <div className={styles.divNonImg}> </div>
          )}
          <section>
            <h1>{element.TituloP}</h1>
            <h5>{element.UserName} | {element.SyR}</h5>
          </section>
          <p><div dangerouslySetInnerHTML={{ __html: htmString }} /> </p>
        </div>
      );
    case "GENERAL":
      return (
        <div className={`${styles.BlockPost} AnimationCenter`} key={element.id} onClick={()=> setModal(element)}>
          {element.ImgUrl ? (
            <div className={styles.divImg}>
              <img src={element.ImgUrl} className={styles.ImgPost} />
            </div>
          ) : (
            <div className={styles.divNonImg}> </div>
          )}
          <section>
            <h1>{element.TituloP}</h1>
            <h5>{element.UserName}</h5>
          </section>
          <p><div dangerouslySetInnerHTML={{ __html: htmString }} /> </p>
        </div>
      );
    case "DEBATE":
      return (
        <div className={`${styles.BlockPost} AnimationCenter`} key={element.id} onClick={()=>setModal(element)}>
          <section>
            <h1>{element.TituloP}</h1>
            <h5>{element.UserName}</h5>
          </section>
          <p><div dangerouslySetInnerHTML={{ __html: htmString }} /> </p>
        </div>
      );
    default:
      return navigate("/naoEncontrado");
  }
};

export default SinglePost;
