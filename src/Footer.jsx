import React from 'react'

import styles from './styles/Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.body}>
        <p>Projeto feito Por José Italo</p>
        <p>Redes para contato:</p>
        <ul>
            <li><a href="www.linkedin.com/in/josé-italo">Linkedin</a></li>
            <li><a href="https://github.com/JoseItaloP">GitHub</a></li>
        </ul>
    </footer>
  )
}

export default Footer
