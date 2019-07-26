var scene, camera, renderer, controls

init()

function init () {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 0, 100)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  // renderer.setClearColor(0x333F47, 1)
  document.body.appendChild(renderer.domElement)

  controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.enablePan = false
  controls.minDistance = 90
  controls.maxDistance = 300

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

var geometry = new THREE.SphereGeometry(50, 32, 32)
var skinColour = 0x996633
var material = new THREE.MeshLambertMaterial({ color: skinColour })
var sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

var UserControls = function () {
  this.skinColour = skinColour
  // this.name = 'Name'
}

window.onload = function () {
  var params = new UserControls()
  var gui = new dat.GUI()

  gui.addColor(params, 'skinColour').name('Skin Tone').onChange(function () {
    material.color.setHex(dec2hex(params.skinColour))
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
