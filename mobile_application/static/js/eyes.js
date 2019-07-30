import * as generateFace from './generateFace.js'

// Facial markers related to Dlib are numbered
// Left eye
var thirtySix = new THREE.Vector2(0, 0)
var thirtySeven = new THREE.Vector2(0, 100)
var thirtyEight = new THREE.Vector2(0, 200)
var thirtyNine = new THREE.Vector2(200, 200)
var forty = new THREE.Vector2(200, 100)
var fortyOne = new THREE.Vector2(200, 0)

// // Right eye
// var fortyTwo = new THREE.Vector2()
// var fortyThree = new THREE.Vector2()
// var fortyFour = new THREE.Vector2()
// var fortyFive = new THREE.Vector2()
// var fortySix = new THREE.Vector2()
// var fortySeven = new THREE.Vector2()

var eyeColour = 0xffffff
var material = new THREE.MeshLambertMaterial({ color: eyeColour })

var leftEyeCurve = new THREE.SplineCurve([
  thirtySix, thirtySeven, thirtyEight, thirtyNine, forty, fortyOne, thirtySix
])

var extrudeSettings = {
  steps: 1,
  depth: 1,
  bevelEnabled: false
}

var leftEyeShape = new THREE.Shape(leftEyeCurve.getSpacedPoints(100))
var geometry = new THREE.ExtrudeGeometry(leftEyeShape, extrudeSettings)
var leftEye = new THREE.Mesh(geometry, material)

generateFace.scene.add(leftEye)

// export {}
