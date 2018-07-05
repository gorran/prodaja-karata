import React from 'react'

import logo from '../assets/logo.jpg'
import {styles} from '../styles'

const imePozorista = 'Mali Vuk'

export default function Header (props) {
  return (
    <h1 style={styles.heading}>
      <img src={logo} style={styles.logo}/> Pozorište {imePozorista}
    </h1>
  )
}