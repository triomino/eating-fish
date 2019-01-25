export const canvasArea = {
  width: 800,
  height: 500,
}

export const miniMap = {
  left: 3,
  top: 3,
  width: 160,
  height: 100,
  mapPointFromMapToMiniCanvas: (x, y) => ({
    x: x / mapArea.width * miniMap.width + miniMap.left,
    y: -y / mapArea.height * miniMap.height + miniMap.top + miniMap.height,
  }),
  mapLengthFromMapToMini: length => length / mapArea.height * miniMap.height,
}

const mapWidth = 4000
const mapHeight = 2500

const catCenter = {x: 100, y: 100}
const dogCenter = {x: mapWidth-catCenter.x, y: mapHeight-catCenter.y}
const distributeDistance = 40
const distribution = [
  {x:0, y:0}, {x:-1, y:0}, {x:1, y:0}, {x:0, y:-1}, {x:0, y:1}
]
const pointList = center => distribution.map(diff=>({
  x:diff.x*distributeDistance+center.x,
  y:diff.y*distributeDistance+center.y
}))

export const mapArea = {
  width: mapWidth,
  height: mapHeight,
  birthPoint: {
    'cat': pointList(catCenter),
    'dog': pointList(dogCenter),
    'cat_spawn': [{x: 200, y: 14800}, {x: 100, y: 14800}, {x : 200, y: 14900}],
  }
}

export const playerTemplate = {
  radius: 15,
  moving: false,
  speed: 2,
}

export const zeroThreshold = 0.1
