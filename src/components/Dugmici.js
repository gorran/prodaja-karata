import React from 'react'
import {connect} from 'react-redux'
import {ipcRenderer} from 'electron'

import {styles} from '../styles'

const stampaj = (sedista) => {
  const izabranaSedista = sedista.map(red => 
    red.filter(s => s.selected)
  )
  izabranaSedista.map((red, i) => {
    if (!red.length) return
    const oblik = red.length > 1 ? 'sedista' : 'sediste'
    console.log(`Rezervisano ${red.length} ${oblik} u redu ${i+1}`)
    red.map(s => console.log(s.value))
  })
}

const stampajKartu = () => {
  console.log('saljem zahtev')
  ipcRenderer.send('stampaj')
}

function Dugmici (props) {
  return (
    <div>
      {/* <button onClick={() => stampaj(props.sedista)}>Štampaj</button> */}
      <button onClick={stampajKartu}>Štampaj</button>
    </div>
  )
}

ipcRenderer.on('odstampano', (e, data) => {
  console.log('odstampano', data)
})

const mapStateToProps = ({sedista}) => ({sedista})

export default connect(mapStateToProps)(Dugmici)