import React from "react";
import styles from './styles/FileInput.module.css'

const FileInput = ({ label, name, Id, className }) => {
  return (
    <div>
      <label className={`${styles.LabelD} ${className}`}>
        <h3>{label}</h3>
        <input type="file" name={name} id={Id} />
      </label>
    </div>
  );
};

export default FileInput;
