import React, { useEffect } from 'react'
import { BsPersonCircle } from "react-icons/bs";
import Logo from './assets/eclipse.png'
import { useNavigate } from 'react-router-dom';
import Enter from './Login/Enter';
import useLogin from './Data/useLogin';
import useFirebase from './Data/useFirebase';
import UserPage from './Login/UserPage';

import styles from './styles/Header.module.css'

const Header = () => {
  const navigate = useNavigate()
  const [tshow, setTShow] = React.useState(false)
  const [tuser, setTuser] = React.useState(false)
  let valor = useLogin.valor
  const LocalS = localStorage.getItem('Logged')
  const {user} = useFirebase()
  let Logged 
  let ImgUser
  
  useEffect(()=>{
    if (Logged) {
      if(tuser != valor) setTuser(valor)
    }else {
      if(tshow != valor) setTShow(valor)
  }
  }, [tshow, tuser])

  return (
    <header className={styles.header}>
      <div className={styles.logoName}>
        <img src={Logo} alt="DKF Logo" />
        <h1 className={styles.tittle} onClick={()=>navigate("/")}><strong>D</strong>o you know a system?</h1>
      </div>
      <div className={styles.login}>
         {user.map((element)=>{
            if(element.id === LocalS){
            Logged = element.name
            ImgUser = element.image
            }
          })}
        {ImgUser ? <img src={ImgUser} alt={`${Logged}_Image`} className={styles.imagePerfil}/> : <BsPersonCircle/>}
        <div className={styles.user}>
         {Logged ? (
          <p className={styles.loggin} onClick={()=> setTuser(!tuser)}>
            {Logged}
            </p>
        ) 
         :
          (
          <p onClick={()=> setTShow(!tshow)}>Login</p>
        )
         }
        </div>
      </div>
      {tshow ? <Enter status={tshow}/>: ''}
      {tuser ? <UserPage status={tuser}/> : ''} 
    </header>
  )
}

export default Header
