import React, { useCallback, useEffect, useState } from "react";
import usePasswordToggle from "./usePasswordToggle";

import styles from './styles/input.module.css'


const Input = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  className
}) => {
  const { visible, setVisible, Icon, InputType } = usePasswordToggle();

  return (
      
    <div className={`${styles.divObject} ${className}`  }>
      <label htmlFor={name}>{label}</label>

      <div className={styles.divPass}>
        <input
          type={type==='password' ? InputType : type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />
        {
          name ==='password' ? (
            <span className={styles.PasswordToggle} onClick={()=>setVisible(!visible)}>{Icon}</span>
          ) :
          null
        }
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Input;
