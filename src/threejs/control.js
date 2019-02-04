import { Euler } from 'three'
import { camera, keys } from 'threejs/model/state'
import { mouseSensity, eulersOfMovement } from 'threejs/model/constants'

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
  const key = e.movementX.toString()
  if (!eulersOfMovement[key]) {
    eulersOfMovement[key] = new Euler(0, -e.movementX * mouseSensity)
  }

  if (e.movementX !== 0) {
    camera.front.applyEuler(eulersOfMovement[key]).applyAxisAngle(
      camera.front.clone().cross(camera.up), -e.movementY * mouseSensity
    )
  }
  else {
    camera.front.applyAxisAngle(
      camera.front.clone().cross(camera.up), -e.movementY * mouseSensity
    )
  }
}
