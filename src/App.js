import React from 'react'

import Sedista from './components/Sedista'
import Header from './components/Header'
import Stampanje from './components/Stampanje'
import {styles} from './styles'

export default function App () {
  return (
    <div style={styles.wrapper}>
      <Header/>
      <Sedista/>
      <Stampanje/>
    </div>
  )
}