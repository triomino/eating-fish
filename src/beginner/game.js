import draw from 'draw'
import {
  listenMouseMove, listenKeyDown, listenKeyUp, listenClick, updateState
} from 'control'
import {
  canvasArea
} from 'model/constants'

function startGame() {
  game.start()
  game.canvas.addEventListener('mousemove', listenMouseMove, false)
  game.canvas.addEventListener('click', listenClick, false)
  window.addEventListener('keydown', listenKeyDown, false)
  window.addEventListener('keyup', listenKeyUp, false)
}

const game = {
  canvas: document.createElement('canvas'),
  start: function() {
    this.canvas.width = canvasArea.width
    this.canvas.height = canvasArea.height
    this.context = this.canvas.getContext('2d')
    document.body.replaceChild(this.canvas, document.getElementById('canvas'))

    this.interval = setInterval(() => { updateState(); draw(game) }, 20)
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

export default startGame
