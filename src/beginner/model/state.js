import { player } from 'beginner/model/model'
import { canvasArea } from 'beginner/model/constants'
import { newCanvas } from 'common/canvas'

export const state = {
  player: new player('cat', {
    fillStyle: 'skyblue', lineWidth: 2, strokeStyle: 'black'
  }),
  players: {},
}

export const mousePos = {
  x: 0,
  y: 0,
  click: false,
}

export const canvas = newCanvas()

export const keys = []

export const viewWindow = {
  center: {x:100, y:100},
  scale: 1, // actual length * scale = view.length
  mapPointFromRealToView: pos => ({
    x: (pos.x - viewWindow.center.x) * viewWindow.scale + canvasArea.width / 2,
    y: (viewWindow.center.y - pos.y) * viewWindow.scale + canvasArea.height / 2
  }),
  mapLengthFromMapToView: length => length * viewWindow.scale,
  mapLengthFromViewToMap: length => length / viewWindow.scale,
  mapPointsFromViewToReal: pos => ({
    x: (pos.x - canvasArea.width / 2) / viewWindow.scale + viewWindow.center.x,
    y: (canvasArea.height / 2 - pos.y) / viewWindow.scale + viewWindow.center.y,
  })
}
