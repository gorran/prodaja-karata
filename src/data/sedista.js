let i = 1

const oznake = [
  ['1 L', '2 L', '3 L', '4 L', '4 D', '3 D', '2 D', '1 D'],
  ['1 L', '2 L', '3 L', '4 L', '5 L', '6 L', '6 D', '5 D', '4 D', '3 D', '2 D', '1 D'],
  ['1 L', '2 L', '3 L', '4 L', '5 L', '5 D', '4 D', '3 D', '2 D', '1 D'],
]

export const sedista = oznake.map(red => 
  red.map(value => (
    {
      id: i++,
      value,
      selected: false,
    }
  ))
)
