import { canvas } from 'webgl/model/state'
import { canvasArea } from 'webgl/model/constants'
import draw from 'webgl/draw'

export function webglStart() {
  game.start()
}

const game = {
  start: function() {
    canvas.width = canvasArea.width
    canvas.height = canvasArea.height
    this.context = canvas.getContext('2d')
    document.body.replaceChild(canvas, document.getElementById('canvas'))

    this.interval = setInterval(() => {
      draw(game)
    }, 40)
  },
  clear: function() {
    this.context.clearRect(0, 0, canvas.width, canvas.height)
  },
}
