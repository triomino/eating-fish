import beginnerStart from 'beginner/game'
import { webglStart } from 'webgl/game'
import { threejsStart } from 'threejs/game'

const gameList = {
  beginner: beginnerStart, webgl: webglStart, threejs: threejsStart
}

const buttonContainer = document.getElementById('selectGame')

for (const gameTitle in gameList) {
  const btn = document.createElement('button')
  const text = document.createTextNode(gameTitle)
  btn.appendChild(text)
  btn.addEventListener('click', function(e) {
    e.preventDefault()
    gameList[gameTitle]()
  })
  buttonContainer.appendChild(btn)
}

