const mousePos = {
  x: 0,
  y: 0,
  draw: function(ctx) {
    ctx.font = '20px Arial'
    ctx.fillText(''+this.x+' '+this.y, 10, 50)
  }
}
export { mousePos }
