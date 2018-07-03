import React from "react";
import {styles} from '../styles'
import {connect} from 'react-redux'

import { zapocniIzbor, zavrsiIzbor } from '../store'

function Sediste(props) {
  const style = {...styles.sediste, backgroundColor: props.data.selected ? '#ab1834' : 'crimson' }
  return (
    <div 
      style={style} 
      onMouseDown={() => props.zapocniIzbor(props.data.id)}
      onMouseUp={() => props.zavrsiIzbor(props.data.id)}
    >
      <span>{props.data.id}</span>
      <small>{props.data.value}</small>
    </div>
  )
}

const mapDispatchToProps = { zapocniIzbor, zavrsiIzbor }

export default connect(null, mapDispatchToProps)(Sediste)