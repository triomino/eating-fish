import draw from 'draw'
import {
  listenMouseMove, listenKeyDown,
  listenKeyUp, listenClick, selfUpdateState, forceUpdateState
} from 'control'
import {
  canvasArea
} from 'model/constants'
import { canvas, state } from './model/state'

function startGame() {
  game.start()
  canvas.addEventListener('mousemove', listenMouseMove, false)
  canvas.addEventListener('click', listenClick, false)
  window.addEventListener('keydown', listenKeyDown, false)
  window.addEventListener('keyup', listenKeyUp, false)

  game.webSocket = new WebSocket('ws://localhost:8080/api/ws/beginner')
  game.webSocket.addEventListener('message', function (event) {
    forceUpdateState(event.data)
  })
}

const game = {
  start: function() {
    canvas.width = canvasArea.width
    canvas.height = canvasArea.height
    this.context = canvas.getContext('2d')
    document.body.replaceChild(canvas, document.getElementById('canvas'))

    this.interval = setInterval(() => {
      selfUpdateState()
      draw(game)
      game.webSocket.send(JSON.stringify(state.player))
    }, 40)
  },
  clear: function() {
    this.context.clearRect(0, 0, canvas.width, canvas.height)
  },
}

export default startGame
