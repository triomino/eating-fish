import { mousePos } from 'components'
function draw(game) {
  game.clear()
  mousePos.draw(game.context)
}
export default draw
