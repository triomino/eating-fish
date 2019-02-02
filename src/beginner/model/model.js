import { mapArea, playerTemplate } from 'beginner/model/constants'

export class player {
  static count = 0
  constructor(type, style) {
    const length = mapArea.birthPoint[type].length
    this.pos = Object.assign(
      {}, mapArea.birthPoint[type][player.count % length]
    )
    this.radius = playerTemplate.radius
    this.moving = playerTemplate.moving
    this.speed = playerTemplate.speed
    this.style = style

    player.count++
  }
}


