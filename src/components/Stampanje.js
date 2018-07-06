import React from 'react'
import {connect} from 'react-redux'
import {ipcRenderer} from 'electron'
import {flatten} from '../shared/helpers'

ipcRenderer.on('odstampano', (e, data) => {
  console.log(`Fajl je sacuvan na adresi: ${data}`)
})

const stampaj = sedista => {
  if (!flatten(sedista).filter(s => s.selected).length)
    return alert("Niste izabrali sedista.")

  const izabranaSedista = sedista.map(red => red.filter(s => s.selected))
  const sablon = praviSablon(izabranaSedista)
  ipcRenderer.send('proslediZaStampu', sablon)
}

const praviSablon = izabranaSedista => {
  let sablon = ``
  const noviRed = '<br>' // ili \n
  izabranaSedista.map((red, i) => {
    if (!red.length) return
    const oblik = red.length > 1 ? 'sedista' : 'sediste'
    sablon += `Rezervisano ${red.length} ${oblik} u redu ${i+1}${noviRed}`
    red.map(s => sablon += s.value + noviRed)
  })
  return sablon
}

const Stampanje = props => (
  <div>
    <button onClick={() => stampaj(props.sedista)}>Štampaj</button>
  </div>
)

const mapStateToProps = ({sedista}) => ({sedista})

export default connect(mapStateToProps)(Stampanje)