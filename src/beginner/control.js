import { mousePos } from 'components'

function listenMouseMove(e) {
  e.preventDefault()
  mousePos.x = e.clientX
  mousePos.y = e.clientY
}

export { listenMouseMove }