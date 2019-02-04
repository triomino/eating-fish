import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { canvasArea } from './constants'

export const scene = new Scene()

export const camera = new PerspectiveCamera(
  75, canvasArea.width/canvasArea.height, 0.1, 1000
)

export const renderer = new WebGLRenderer()
renderer.setSize( canvasArea.width, canvasArea.height)

export const keys = {}
