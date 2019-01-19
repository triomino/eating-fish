import draw from 'draw'
import { listenMouseMove } from 'control'

function startGame() {
  game.start()
  game.canvas.addEventListener('mousemove', listenMouseMove, false)
}

const game = {
  canvas: document.createElement('canvas'),
  start: function() {
    this.canvas.width = 480
    this.canvas.height = 270
    this.context = this.canvas.getContext('2d')
    document.body.replaceChild(this.canvas, document.getElementById('canvas'))

    this.interval = setInterval(() => draw(game), 50)
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

export default startGame
