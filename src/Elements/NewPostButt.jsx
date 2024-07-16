import React from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './styles/Button.module.css'

const NewPostButt = ({children}) => {
    const navigate = useNavigate();
  
    function NewPost() {
      navigate("/Post/NewPost");
    }
  
    return (
      <button
        className={styles.Bott}
        onClick={NewPost}
      >
        {children}
      </button>
    );
}

export default NewPostButt
