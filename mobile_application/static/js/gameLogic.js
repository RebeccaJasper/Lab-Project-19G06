import * as generateFace from './face.js'
import * as eyes from './eyes.js'
import * as mouth from './mouth.js'
import * as nose from './nose.js'
import * as brows from './brows.js'

var scene, camera, renderer, controls

// Initialise scene with camera, renderer, controls and lighting

scene = new THREE.Scene()
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 500)
camera.lookAt(0, 0, 0)

var strDownloadMime = 'image/octet-stream'

var saveLink = document.createElement('div')
saveLink.style.position = 'absolute'
saveLink.style.top = '10px'
saveLink.style.width = '100%'
saveLink.style.color = 'white !important'
saveLink.style.textAlign = 'center'
saveLink.innerHTML =
        '<a href="#" id="saveLink">Save Frame</a>'
document.body.appendChild(saveLink)
document.getElementById('saveLink').addEventListener('click', saveAsImage)
renderer = new THREE.WebGLRenderer({
  preserveDrawingBuffer: true

})

// renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enablePan = true
controls.minDistance = 90
controls.maxDistance = 800

var ambientLight = new THREE.AmbientLight(0x404040) // soft white light
scene.add(ambientLight)

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7)
// 					left/right, up/down, front/back
directionalLight.position.set(0, 0, 1)
scene.add(directionalLight)

window.addEventListener('resize', function () {
  var width = window.innerWidth
  var height = window.innerHeight
  renderer.setSize(width, height)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
})

// draw scene
var render = function () {
  renderer.render(scene, camera)
}

// run game loop (update, render, repeat)
var gameLoop = function () {
  requestAnimationFrame(gameLoop)
  generateFace.update()
  eyes.update()
  mouth.update()
  nose.update()
  brows.update()
  render()
}

gameLoop()

/// //////////////////////

function saveAsImage () {
  var imgData, imgNode

  try {
    var strMime = 'image/jpeg'
    imgData = renderer.domElement.toDataURL(strMime)

    saveFile(imgData.replace(strMime, strDownloadMime), 'test.jpg')
  } catch (e) {
    console.log(e)
  }
}

var saveFile = function (strData, filename) {
  var link = document.createElement('a')
  if (typeof link.download === 'string') {
    document.body.appendChild(link) // Firefox requires the link to be in the body
    link.download = filename
    link.href = strData
    link.click()
    document.body.removeChild(link) // remove the link when done
  } else {
    location.replace(uri)
  }
}

export { scene }
