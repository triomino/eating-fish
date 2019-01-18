// eslint-disable-next-line no-unused-vars
function startGame() {
  game.start()
}

let game = {
  canvas: document.createElement('canvas'),
  start: function() {
    this.canvas.width = 480
    this.canvas.height = 270
    this.context = this.canvas.getContext('2d')
    document.body.replaceChild(this.canvas, document.getElementById('canvas'))
  }
}
