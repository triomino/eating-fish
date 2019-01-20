import { mousePos, keys, state, viewWindow } from 'model/state'
import {zeroThreshold} from 'model/constants'

export function listenMouseMove(e) {
  e.preventDefault()
  mousePos.x = e.clientX
  mousePos.y = e.clientY
}

export function listenClick(e) {
  e.preventDefault()
  mousePos.x = e.clientX
  mousePos.y = e.clientY
  state.player.moving = true
  state.player.movingTo = viewWindow.reverseMapPoint({
    x: mousePos.x, y: mousePos.y
  })
}

export function listenKeyDown(e) {
  e.preventDefault()
  keys[e.key] = true
}

export function listenKeyUp(e) {
  e.preventDefault()
  keys[e.key] = false
}

export function updateState() {
  updatePlayer(state.player)
}

function updatePlayer(player) {
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

