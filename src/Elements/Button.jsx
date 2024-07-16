import React from "react";
import styles from "./styles/Button.module.css";
import { useNavigate } from "react-router-dom";

const Button = ({ children, Pnovo, onClick, className }) => {
  const navigate = useNavigate();
  const [newP, setNewP] = React.useState(Pnovo)

  function NewPost() {
    newP ? navigate("/Post/NewPost"): '';
  }

  return (
    <button
      className={`${styles.Bott} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
