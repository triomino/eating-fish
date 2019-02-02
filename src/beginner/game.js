import draw from 'beginner/draw'
import {
  listenMouseMove, listenKeyDown,
  listenKeyUp, listenClick, forceUpdateState
} from 'beginner/control'
import {
  canvasArea
} from 'beginner/model/constants'
import { webSocket } from './websocket'
import { newCanvas } from 'common/canvas'

const canvas = newCanvas()

function beginnerStart() {
  game.start()
  canvas.addEventListener('mousemove', listenMouseMove, false)
  canvas.addEventListener('click', listenClick, false)
  window.addEventListener('keydown', listenKeyDown, false)
  window.addEventListener('keyup', listenKeyUp, false)
}

const game = {
  start: function() {
    canvas.width = canvasArea.width
    canvas.height = canvasArea.height
    this.context = canvas.getContext('2d')
    document.body.replaceChild(canvas, document.getElementById('canvas'))

    webSocket.addEventListener('message', function (event) {
      forceUpdateState(event.data)
    })
    this.interval = setInterval(() => {
      draw(game)
    }, 40)
  },
  clear: function() {
    this.context.clearRect(0, 0, canvas.width, canvas.height)
  },
}

export default beginnerStart
