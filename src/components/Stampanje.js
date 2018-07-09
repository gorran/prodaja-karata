import React from 'react'
import {connect} from 'react-redux'
import {ipcRenderer} from 'electron'
import {flatten} from '../shared/helpers'
import { log } from 'util';

ipcRenderer.on('sacuvano', (e, data) => {
  console.log(`Fajl je sacuvan na adresi: ${data}`)
})

ipcRenderer.on('odstampano', (e, success) => {
  console.log(`Stampanje ${success ? '' : 'ni'}je krenulo.`)
})

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

const Stampanje = props => {

  const prosledi = dogadjaj => {   
    if (!flatten(props.sedista).filter(s => s.selected).length)
      return alert("Niste izabrali sedista.")
    const izabranaSedista = props.sedista.map(red => red.filter(s => s.selected))
    const sablon = praviSablon(izabranaSedista)
    ipcRenderer.send(dogadjaj, sablon)
  }
  
  const stampaj = () => prosledi('proslediZaStampu')
  
  const sacuvaj = () => prosledi('proslediZaFajl')
  
  return (
    <div>
      <button onClick={() => stampaj()}>Štampaj</button>
      <button onClick={() => sacuvaj()}>Sačuvaj PDF</button>
    </div>
  )
}

const mapStateToProps = ({sedista}) => ({sedista})

export default connect(mapStateToProps)(Stampanje)