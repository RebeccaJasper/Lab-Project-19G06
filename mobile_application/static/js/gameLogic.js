import * as generateFace from './generateFace.js'
import * as eyes from './eyes.js'

var scene, camera, renderer, controls

// Initialise scene with camera, renderer, controls and lighting

scene = new THREE.Scene()
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 800)
camera.lookAt(0, 0, 0)

renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enablePan = false
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

// game logic
// var update = function () {
//     // scene.remove(generateFace.face)
//     var faceShape = new THREE.Shape(generateFace.faceCurve.getSpacedPoints(100))
//     var geometry = new THREE.ExtrudeGeometry(faceShape, generateFace.extrudeSettings)
//     face = new THREE.Mesh(geometry, generateFace.material)
//     scene.add(face)

//     // scene.remove(eyes.leftEye)
//     // eyes.leftEyeShape = new THREE.Shape(eyes.leftEyeCurve.getSpacedPoints(100))
//     // geometry = new THREE.ExtrudeGeometry(eyes.leftEyeShape, eyes.extrudeSettings)
//     // leftEye = new THREE.Mesh(geometry, eyes.material)
//     // scene.add(eyes.leftEye)
// }

// draw scene
var render = function () {
  renderer.render(scene, camera)
}

// run game loop (update, render, repeat)
var gameLoop = function () {
  requestAnimationFrame(gameLoop)
  generateFace.update()
  eyes.update()
  // update()
  render()
}

gameLoop()

export { scene }
