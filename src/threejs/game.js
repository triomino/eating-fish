import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial, Vector3,
} from 'three'
import { camera, scene, renderer, keys } from 'threejs/model/state'
import { listenKeyDown, listenKeyUp, listenMouseMove } from 'threejs/control'

export function threejsStart() {
  game.start()

  renderer.domElement.addEventListener('mousemove', listenMouseMove, false)
  renderer.domElement.requestPointerLock()
  window.addEventListener('keydown', listenKeyDown, false)
  window.addEventListener('keyup', listenKeyUp, false)
}

const game = {
  start: function() {
    const canvas = renderer.domElement
    canvas.id = 'canvas'

    document.body.replaceChild(canvas , document.getElementById('canvas'))

    const geometry = new BoxGeometry( 1, 1, 1 )
    const material = new MeshBasicMaterial( { color: 0x00ff00 } )
    const cube = new Mesh( geometry, material )
    scene.add( cube )

    camera.position.x = -5
    camera.front = new Vector3(1, 0, 0)
    camera.movingSpeed = 0.2

    const animate = function () {
      requestAnimationFrame( animate )

      game.updateState()
      document.getElementById('debug').innerText=JSON.stringify(camera.front)
      renderer.render( scene, camera )
    }

    animate()
  },
  updateState: function () {
    for (const key in directionOfKeys)
      if (keys[key]) {
        const direction = directionOfKeys[key]()
        camera.position.add(direction.multiplyScalar(camera.movingSpeed))
      }
    camera.lookAt(camera.position.clone().add(camera.front))
  }
}

const directionOfKeys = {
  'w': () => camera.front.clone(),
  'a': () => camera.front.clone().cross(camera.up).negate(),
  's': () => camera.front.clone().negate(),
  'd': () => camera.front.clone().cross(camera.up),
  'Escape': () => render.domElement.exitPointerLock()
}
