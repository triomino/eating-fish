import { Euler } from 'three'
import { camera, keys } from 'threejs/model/state'
import { mouseSensity, eulersOfMovement, PI, MAX_PITCH } from 'threejs/model/constants'

export function listenKeyDown(e) {
  e.preventDefault()
  console.log(e)
  keys[e.key] = true
}

export function listenKeyUp(e) {
  e.preventDefault()
  keys[e.key] = false
}

export function listenMouseMove(e) {
  e.preventDefault()

  let yaw = camera.yaw - e.movementX * mouseSensity
  if (yaw > PI) {
    yaw -= PI * 2
  }
  else if (yaw  < -PI) {
    yaw += PI * 2
    console.log(yaw)
  }

  let pitch = camera.pitch - e.movementY * mouseSensity
  if (pitch > MAX_PITCH) {
    pitch = MAX_PITCH
  }
  else if (pitch < -MAX_PITCH) {
    pitch = -MAX_PITCH
  }

  camera.front.set(1, 0, 0)
  rotation.set(0, yaw, pitch)
  camera.front.applyEuler(rotation)
  camera.yaw = yaw
  camera.pitch = pitch
}

const rotation = new Euler(1, 0, 0)
