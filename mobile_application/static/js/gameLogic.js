import * as face from './face.js'
import * as eyes from './eyes.js'
import * as mouth from './mouth.js'
import * as nose from './nose.js'
import * as brows from './brows.js'
import * as shadows from './shadows.js'

var scene, camera, renderer, controls

// Initialise scene with camera, renderer, controls and lighting

scene = new THREE.Scene()
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 270, 500)
camera.position.set(0, 0, 500)
camera.lookAt(0, 0, 0)

renderer = new THREE.WebGLRenderer({
  preserveDrawingBuffer: true
})

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enablePan = false
controls.minDistance = 300
controls.maxDistance = 500
controls.enableRotate = false

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
// function animate () {
//   setTimeout(function () {
//     requestAnimationFrame(animate)
//     console.log('loop')
//     face.update()
//     eyes.update()
//     mouth.update()
//     nose.update()
//     brows.update()
//     shadows.update()
//   }, 500)
//   render()
// }

let request = requestAnimationFrame(animate)

function animate () {
  console.log('loop')
  face.update()
  eyes.update()
  mouth.update()
  nose.update()
  brows.update()
  shadows.update()
  render()
}

animate()

function cancelAnimate () {
  // setTimeout(function () {
  cancelAnimationFrame(request)
  // }, 0)
}

// var isAnimating = true

// function setAnimation (change) {
//   if (change === true) {
//     isAnimating = true
//   }
//   if (change === false) {
//     setTimeout(function () {
//       isAnimating = false
//     }, 500)
//   }
// }

// function animate () {
//   if (isAnimating) {
//     // setTimeout(function () {
//     requestAnimationFrame(animate)
//     console.log('loop')
//     face.update()
//     eyes.update()
//     mouth.update()
//     nose.update()
//     brows.update()
//     shadows.update()
//     // }, 500)
//     render()
//   }
// }

// animate()

// Save screen/frame as a jpeg image
function saveAsImage () {
  try {
    var strMime = 'image/jpeg'
    var imgData = renderer.domElement.toDataURL(strMime)
    // window.open(imgData)
    return imgData
  } catch (e) {
    console.log(e)
  }
}

// Save skin and eye colour
function saveColours () {
  let colours = {
    'skinColour': face.material.color.getHexString(),
    'eyeColour': eyes.material.color.getHexString()
  }
  // console.log(colours)
  return colours
}

export { scene, saveAsImage, saveColours, animate, cancelAnimate }
