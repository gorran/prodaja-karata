import React from 'react'

import logo from './assets/logo.jpg'
import {styles} from './styles'
import Sedista from './components/Sedista'

const imePozorista = 'Mali Vuk'

export default function App () {
  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}><img src={logo} style={styles.logo}/> Pozorište {imePozorista}</h1>
      <Sedista/>
    </div>
  )
}