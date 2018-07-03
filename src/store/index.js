import {sedista} from '../data/sedista'

const initialState = {
  sedista,
  pocetakIzbora: 0,
}

// TODO: ako je u opsegu samo jedan, i ako je vec izabran, false

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ZAPOCNI_IZBOR': {
      const sedista = state.sedista.map(red => 
        red.map(obj => 
          ({...obj, selected: obj.id === action.id})
        )
      )
      return {...state, sedista, pocetakIzbora: action.id}
    }
    case 'IZABERI_SEDISTA': {
      const min = Math.min(state.pocetakIzbora, action.id)
      const max = Math.max(state.pocetakIzbora, action.id)
      const sedista = state.sedista.map(red => 
        red.map(obj => 
          obj.id >= min && obj.id <= max 
            ? {...obj, selected: true}
            : {...obj, selected: false}
        )
      )
      return {...state, sedista}
    }
    default:
      return state
  }
}

/* ACTIONS */

export const zapocniIzbor = id => ({type: 'ZAPOCNI_IZBOR', id})
export const izaberiSedista = id => ({type: 'IZABERI_SEDISTA', id})
