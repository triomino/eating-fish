import draw from 'threejs/draw'

export function threejsStart() {
  game.start()
}

const game = {
  start: function() {
    draw(game)
  },
}
