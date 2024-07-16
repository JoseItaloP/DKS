import React from 'react'
import Log from './assets/eclipse-assets/eclipse.png'
import styles from './styles/Logo.module.css'


const Logo = () => {
  return (
    <div className={styles.corpo}>
      <img src={Log} alt="Logo" />
    </div>
  )
}

export default Logo
