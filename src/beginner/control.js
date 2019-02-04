import { mousePos, keys, state, viewWindow, canvas } from 'beginner/model/state'
import {zeroThreshold} from 'beginner/model/constants'
import {webSocket} from './websocket'

export function listenMouseMove(e) {
  e.preventDefault()
  mousePos.x = e.clientX
  mousePos.y = e.clientY
}

export function listenClick(e) {
  e.preventDefault()
  const rect = canvas.getBoundingClientRect()
  mousePos.x = e.clientX - rect.left
  mousePos.y = e.clientY - rect.top
  state.player.moving = true
  state.player.movingTo = viewWindow.mapPointsFromViewToReal({
    x: mousePos.x, y: mousePos.y
  })
  selfUpdateState()
}

export function listenKeyDown(e) {
  e.preventDefault()
  keys[e.key] = true
}

export function listenKeyUp(e) {
  e.preventDefault()
  keys[e.key] = false
}

export function selfUpdateState() {
  selfUpdatePlayer(state.player)
  webSocket.send(JSON.stringify(state.player))
}

function updateView() {
  // TODO: naturally following
  if (viewWindow?.center) {
    viewWindow.center.x = state.player.pos.x
    viewWindow.center.y = state.player.pos.y
  }
}

export function forceUpdateState(data) {
  const newState = JSON.parse(data)
  if (newState.players) {
    for (const id in newState.players) {
      state.players[id] = state.players[id] ? {
        ...state.players[id],
        pos : {
          ...newState.players[id],
        }
      } : {pos : {...newState.players[id]}}
    }
  }

  if (newState.players[newState?.me]) {
    state.player = {
      ...state.player,
      pos :{
        ...state.player.pos,
        ...newState.players[newState?.me],
      },
      id: newState?.me
    }
  }

  updateView()
  document.getElementById('debug').innerText = JSON.stringify(state)
}

function selfUpdatePlayer(player) {
  if (player.moving) {
    const diff = {
      x: player.movingTo.x - player.pos.x,
      y: player.movingTo.y - player.pos.y
    }
    const length = Math.sqrt(diff.x * diff.x + diff.y * diff.y)
    if (length < player.speed) {
      player.pos.x = player.movingTo.x
      player.pos.y = player.movingTo.y
    }
    else if (length > zeroThreshold) {
      player.pos.x += diff.x / length * player.speed
      player.pos.y += diff.y / length * player.speed
    }
  }
}

