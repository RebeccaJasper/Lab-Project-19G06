var scene, camera, renderer, controls

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

var skinColour = 0x996633
var material = new THREE.MeshLambertMaterial({ color: skinColour })

// Facial markers related to Dlib are numbered

// Face shape
var zero = new THREE.Vector2(-177, 120)
var four = new THREE.Vector2(-147, -44)
var six = new THREE.Vector2(-88, -104)
var eight = new THREE.Vector2(0, -150)
var ten = new THREE.Vector2(88, -104)
var twelve = new THREE.Vector2(147, -44)
var sixteen = new THREE.Vector2(177, 120)

// Facial markers added to make face look better
// FH = forehead markers
var FH0 = new THREE.Vector2(0, 320)
var FH1 = new THREE.Vector2(-88, 310)
var FH2 = new THREE.Vector2(88, 310)
var FH3 = new THREE.Vector2(-147, 250)
var FH4 = new THREE.Vector2(147, 250)

var faceCurve = new THREE.SplineCurve([
  FH0, FH1, FH3, zero, four, six, eight, ten, twelve, sixteen, FH4, FH2, FH0
])

var extrudeSettings = {
  steps: 1,
  depth: 10,
  bevelEnabled: false,
  bevelThickness: 50,
  bevelSize: 50,
  bevelOffset: 50,
  bevelSegments: 10
}

var faceShape = new THREE.Shape(faceCurve.getSpacedPoints(100))
var geometry = new THREE.ExtrudeGeometry(faceShape, extrudeSettings)
var face = new THREE.Mesh(geometry, material)

function dec2hex (i) {
  var result = '0x000000'
  if (i >= 0 && i <= 15) { result = '0x00000' + i.toString(16) } else if (i >= 16 && i <= 255) { result = '0x0000' + i.toString(16) } else if (i >= 256 && i <= 4095) { result = '0x000' + i.toString(16) } else if (i >= 4096 && i <= 65535) { result = '0x00' + i.toString(16) } else if (i >= 65535 && i <= 1048575) { result = '0x0' + i.toString(16) } else if (i >= 1048575) { result = '0x' + i.toString(16) }
  if (result.length === 8) { return result }
}

var update = function () {
  // game logic
  scene.remove(face)
  faceShape = new THREE.Shape(faceCurve.getSpacedPoints(100))
  geometry = new THREE.ExtrudeGeometry(faceShape, extrudeSettings)
  face = new THREE.Mesh(geometry, material)
  scene.add(face)
}

// draw scene
var render = function () {
  renderer.render(scene, camera)
}

// run game loop (update, render, repeat)
var gameLoop = function () {
  requestAnimationFrame(gameLoop)
  update()
  render()
}

gameLoop()

export { skinColour, material, zero, four, six, ten, twelve, sixteen, dec2hex, scene }
