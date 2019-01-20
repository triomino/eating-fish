import { player } from 'model/model'
import { mapArea, canvasArea } from 'model/constants'

export const state = {
  player: new player('cat', {
    fillStyle: 'skyblue', lineWidth: 2, strokeStyle: 'black'
  }),
  friendly: [new player('cat', {
    fillStyle: 'green', lineWidth: 2, strokeStyle: 'black'
  })],
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

export const keys = []

export const viewWindow = {
  center: mapArea.birthPoint['cat'][0],
  scale: 1,
  mapPoint: pos => ({
    x: (pos.x - viewWindow.center.x) * viewWindow.scale + canvasArea.width / 2,
    y: (pos.y - viewWindow.center.y) * viewWindow.scale + canvasArea.height / 2
  }),
  mapLength: length => length * viewWindow.scale,
  reverseMapPoint: pos => ({
    x: (pos.x - canvasArea.width / 2) / viewWindow.scale + viewWindow.center.x,
    y: (pos.y - canvasArea.height / 2) / viewWindow.scale + viewWindow.center.y,
  })
}
