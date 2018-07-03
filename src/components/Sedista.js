import React from 'react'
import {connect} from 'react-redux'

import {sedista} from '../data/sedista'
import Sediste from './Sediste'
import {styles} from '../styles'

function Sedista(props) {
  const jsx = props.sedista.map((red, i) => {
    const kolona = red.map(sediste =>
      <Sediste key={sediste.id} data={sediste} />
    )
    return <div style={styles.sedistaRed} key={i}>{kolona}</div>
  })
  return <section>{jsx}</section>
}

const mapStateToProps = ({sedista}) => ({sedista})

export default connect(mapStateToProps)(Sedista)