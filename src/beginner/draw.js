import { mousePos, state, viewWindow } from 'model/state'

function draw(game) {
  game.clear()
  mousePos.draw(game.context)
  drawState(game.context, state)
}

function drawState(ctx, state) {
  drawPlayer(ctx, state.player)
  drawFriendly(ctx, state.friendly)
}

function drawPlayer(ctx, player) {
  ctx = Object.assign(ctx, player.style)

  const center = viewWindow.mapPoint(player.pos)
  const radius = viewWindow.mapLength(player.radius)

  ctx.beginPath()
  ctx.arc(center.x, center.y, radius, 0, 2*Math.PI, false)
  ctx.fill()
  ctx.stroke()
}

function drawFriendly(ctx, friendly) {
  friendly.forEach(friend => drawPlayer(ctx, friend))
}

export default draw
