import React from "react";
import ResumeSModal from "./ModalShow/ResumeSModal";
import DebateModal from "./ModalShow/DebateModal";
import RuleModal from "./ModalShow/RuleModal";
import GeneralModal from "./ModalShow/GeneralModal";

import styles from "./styles/Default.module.css";

const PostModal = ({ element, type, setModal }) => {
  function handleOutsideClick(evt) {
    if (evt.target === evt.currentTarget) setModal(null);
  }

  switch (type) {
    case "RESULME":
      return (
        <div onClick={handleOutsideClick} className={styles.modal}>
          <ResumeSModal element={element} />
        </div>
      );
      break;
    case "RULE":
      return (
        <div onClick={handleOutsideClick} className={styles.modal}>
          <RuleModal element={element} />
        </div>
      );
      break;
    case "GENERAL":
      return (
        <div onClick={handleOutsideClick} className={styles.modal}>
          <GeneralModal element={element} />
        </div>
      );
      break;
    case "DEBATE":
      return (
        <div onClick={handleOutsideClick} className={styles.modal}>
          <DebateModal element={element} />
        </div>
      );
      break;
    default:
      return navigate("/naoEncontrado");
  }
};

export default PostModal;
