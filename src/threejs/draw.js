import {Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry,
  MeshBasicMaterial, Mesh} from 'three'

import { canvasArea } from 'threejs/model/constants'

export default function draw(game) {
  var scene = new Scene()
  var camera = new PerspectiveCamera(
    75, canvasArea.width/canvasArea.height, 0.1, 1000
  )

  var renderer = new WebGLRenderer()
  renderer.setSize( canvasArea.width, canvasArea.height)

  const node = renderer.domElement
  node.id = 'canvas'
  document.body.replaceChild( node , document.getElementById('canvas'))

  var geometry = new BoxGeometry( 1, 1, 1 )
  var material = new MeshBasicMaterial( { color: 0x00ff00 } )
  var cube = new Mesh( geometry, material )
  scene.add( cube )

  camera.position.z = 5

  var animate = function () {
    requestAnimationFrame( animate )

    cube.rotation.x += 0.01
    // cube.rotation.y += 0.01

    renderer.render( scene, camera )
  }

  animate()
}
