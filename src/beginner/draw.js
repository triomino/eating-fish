import { state, viewWindow } from 'beginner/model/state'
import { canvasArea, miniMap } from 'beginner/model/constants'

function draw(game) {
  game.clear()
  drawState(game.context, state)
}

function drawState(ctx, state) {
  drawMesh(ctx)
  drawMiniMap(ctx)
  drawPlayers(ctx, state.players)
  drawPlayer(ctx, state.player)
}

function drawPlayer(ctx, player) {
  if (player.style) {
    ctx = Object.assign(ctx, player.style)
  }
  const center = viewWindow.mapPointFromRealToView(player.pos)
  const radius = viewWindow.mapLengthFromMapToView(player.radius || 15)

  ctx.beginPath()
  ctx.arc(center.x, center.y, radius, 0, 2*Math.PI, false)
  ctx.fill()
  ctx.stroke()
}

function drawPlayers(ctx, players) {
  for (const id in players) {
    if (id.toString() !== state.player.id.toString()) {
      drawPlayer(ctx, state.players[id])
    }
  }
}

function drawMiniMap(ctx) {

  // map frame
  ctx.beginPath()
  // ctx.fillStyle = 'white'
  const {left, top, height, width} = miniMap
  ctx.rect(left, top, width, height)

  // view window frame
  const { center: {x: viewX, y: viewY}, scale} = viewWindow
  const {x: cX, y: cY} = miniMap.mapPointFromMapToMiniCanvas(viewX, viewY)
  const halfH = miniMap.mapLengthFromMapToMini(canvasArea.height / scale) / 2
  const halfW = miniMap.mapLengthFromMapToMini(canvasArea.width / scale) / 2
  ctx.rect(cX-halfW, cY-halfH, halfW*2, halfH*2)

  for (const id in state.players) {
    const {x, y} = state.players[id].pos
    const { x: miniX, y: miniY } = miniMap.mapPointFromMapToMiniCanvas(x, y)
    console.log(miniX, miniY)
    ctx.fillStyle='skyblue'
    ctx.fillRect(miniX, miniY, 3, 3)
  }

  ctx.stroke()
}

function drawMesh(ctx) {
  ctx.beginPath()
  const blockLength = 200
  const cX = (Math.floor(viewWindow.center.x / blockLength) - 4) * blockLength
  const cY = (Math.floor(viewWindow.center.y / blockLength) - 4) * blockLength
  let { x: vX, y: vY } = viewWindow.mapPointFromRealToView({x: cX, y: cY})
  for (let x = 0; x < 10; ++x, vX += blockLength) {
    console.log(vX)
    ctx.moveTo(vX , 0)
    ctx.lineTo(vX, canvasArea.height)
  }
  for (let y = 0; y < 10; ++y, vY -= blockLength) {
    console.log(vY)
    ctx.moveTo(0, vY)
    ctx.lineTo(canvasArea.width, vY)
  }
  ctx.stroke()
}
export default draw
