import React from "react";
import {styles} from '../styles'
import {connect} from 'react-redux'

import { zapocniIzbor, izaberiSedista } from '../store'

function Sediste(props) {
  const style = {
    ...styles.sediste, 
    backgroundColor: props.data.selected ? '#ab1834' : 'crimson'
  }
  const izaberi = e => {
    if (e.buttons == 1) props.izaberiSedista(props.data.id)
  }  
  return (
    <div 
      style={style} 
      onMouseDown={() => props.zapocniIzbor(props.data.id)}
      onMouseOver={izaberi}
    >
      <span>{props.data.id}</span>
      <small>{props.data.value}</small>
    </div>
  )
}

const mapDispatchToProps = { zapocniIzbor, izaberiSedista }

export default connect(null, mapDispatchToProps)(Sediste)