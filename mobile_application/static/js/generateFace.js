var scene, camera, renderer, controls

init()

function init () {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 800)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  // renderer.setClearColor(0x333F47, 1)
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
}

window.addEventListener('resize', function () {
  var width = window.innerWidth
  var height = window.innerHeight
  renderer.setSize(width, height)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
})

var skinColour = 0x996633
var material = new THREE.MeshLambertMaterial({ color: skinColour })

// setup facial markers
var zero = new THREE.Vector2(-177, 120) // 0
var four = new THREE.Vector2(-147, -44) // 4
var six = new THREE.Vector2(-88, -104) // 6
var eight = new THREE.Vector2(0, -150) // 8
var ten = new THREE.Vector2(88, -104) // 10
var twelve = new THREE.Vector2(147, -44) // 12
var sixteen = new THREE.Vector2(177, 120) // 16

var curve = new THREE.SplineCurve([
  zero, four, six, eight, ten, twelve, sixteen
])

var extrudeSettings = {
  steps: 50,
  depth: 100,
  bevelEnabled: false,
  bevelThickness: 100,
  bevelSize: 50,
  bevelOffset: 50,
  bevelSegments: 100
}

var shape = new THREE.Shape(curve.getSpacedPoints(100))
var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
var face = new THREE.Mesh(geometry, material)
scene.add(face)

var UserControls = function () {
  this.skinColour = skinColour
  this.upperWidth = 0
}

window.onload = function () {
  var params = new UserControls()
  var gui = new dat.GUI()

  gui.addColor(params, 'skinColour').name('Skin Tone').onChange(function () {
    material.color.setHex(dec2hex(params.skinColour))
  })

  gui.add(params, 'upperWidth', -100, 100).name('Upper Face Width').onChange(function () {
    let value = params.upperWidth
    zero.x -= value
    sixteen.x += value
    console.log(value)
    console.log(curve)

    shape = new THREE.Shape(curve.getSpacedPoints(100))
    geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    face = new THREE.Mesh(geometry, material)
    scene.add(face)
  })
}

function dec2hex (i) {
  var result = '0x000000'
  if (i >= 0 && i <= 15) { result = '0x00000' + i.toString(16) } else if (i >= 16 && i <= 255) { result = '0x0000' + i.toString(16) } else if (i >= 256 && i <= 4095) { result = '0x000' + i.toString(16) } else if (i >= 4096 && i <= 65535) { result = '0x00' + i.toString(16) } else if (i >= 65535 && i <= 1048575) { result = '0x0' + i.toString(16) } else if (i >= 1048575) { result = '0x' + i.toString(16) }
  if (result.length == 8) { return result }
}

var update = function () {
  // game logic
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
