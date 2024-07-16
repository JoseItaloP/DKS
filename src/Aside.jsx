import React from 'react'
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle  } from "react-icons/io";
import {useNavigate } from 'react-router-dom';

import styles from './styles/Aside.module.css'

const Aside = () => {
 const [show, setShow] = React.useState(false)
 const navigate = useNavigate()

  return (
    <aside className={`${styles.all} scaleUpVerTop`}>
      <div className={`${show ? styles.body : styles.num} scaleUpVerTop`}>
        <ul className={styles.list}>
          <li onClick={()=>navigate("/Post/ResumeSystemPost")}>Resumo de sistemas</li>
          <li onClick={()=>navigate("/Post/DebatePost")}>Debates</li>
          <li onClick={()=>navigate("/Post/RulePost")}>Regras de sistemas</li>
          <li onClick={()=>navigate("/Post/GeneralPost")}>Posts gerais</li>
        </ul>
      </div>
      <button className={styles.butt} onClick={()=>setShow(!show)}>{show ?<IoMdArrowDropupCircle/> : <IoMdArrowDropdownCircle />}</button>
    </aside>
  )
}

export default Aside
