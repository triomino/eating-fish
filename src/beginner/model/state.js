import { player } from 'model/model'
import { mapArea, canvasArea } from 'model/constants'

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
  draw: function(ctx) {
    ctx.font = '20px Arial'
    ctx.fillText(''+this.x+' '+this.y+this.click, 10, 50)
  }
}

export const canvas = document.createElement('canvas')

export const keys = []

export const viewWindow = {
  center: {x:100, y:100},
  scale: 1,
  mapPointFromRealToView: pos => ({
    x: (pos.x - viewWindow.center.x) * viewWindow.scale + canvasArea.width / 2,
    y: (viewWindow.center.y - pos.y) * viewWindow.scale + canvasArea.height / 2
  }),
  mapLength: length => length * viewWindow.scale,
  mapPointsFromViewToReal: pos => ({
    x: (pos.x - canvasArea.width / 2) / viewWindow.scale + viewWindow.center.x,
    y: (canvasArea.height / 2 - pos.y) / viewWindow.scale + viewWindow.center.y,
  })
}
