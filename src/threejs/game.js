import {
  BoxBufferGeometry, Color,
  Mesh, DirectionalLight,
  MeshPhongMaterial, Vector3, MeshLambertMaterial,
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

    const geometry = new BoxBufferGeometry( 1, 1, 1 )
    const material = new MeshPhongMaterial( {
      color: 0x00ff00, specular: 0xffffff
    } )
    const cube = new Mesh( geometry, material )

    const floorGeometry = new BoxBufferGeometry( 100, 1, 100 )
    const floorMaterial = new MeshLambertMaterial( {
      color: 0x156289, emissive: 0x072534
    } )
    const floor = new Mesh( floorGeometry, floorMaterial )
    floor.position.y = -3

    const light = new DirectionalLight( 0xffffff, 1 )
    light.position.set(1, 1, 1)

    scene.background = new Color(0xffffff)
    scene.add( cube )
    scene.add( floor )
    scene.add( light )

    camera.position.x = -5
    camera.yaw = 0
    camera.pitch = 0
    camera.front = new Vector3(1, 0, 0)
    camera.movingSpeed = 0.2

    const animate = function () {
      requestAnimationFrame( animate )

      game.updateState()
      document.getElementById('debug').innerText=JSON.stringify({
        yaw: camera.yaw, pitch: camera.pitch
      })
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
  'Escape': () => renderer.domElement.exitPointerLock()
}
