import { mousePos, state, viewWindow } from 'model/state'

function draw(game) {
  game.clear()
  mousePos.draw(game.context)
  drawState(game.context, state)
}

function drawState(ctx, state) {
  drawPlayers(ctx, state.players)
  drawPlayer(ctx, state.player)
}

function drawPlayer(ctx, player) {
  if (player.style) {
    ctx = Object.assign(ctx, player.style)
  }

  console.log('draw')
  console.log(player)
  const center = viewWindow.mapPointFromRealToView(player.pos)
  const radius = viewWindow.mapLength(player.radius || 15)

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

export default draw
