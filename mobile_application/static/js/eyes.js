import * as generateFace from './generateFace.js'

// Facial markers related to Dlib are numbered
// Left eye
var thirtySix = new THREE.Vector2(-113, 138)
var thirtySeven = new THREE.Vector2(-94, 150)
var thirtyEight = new THREE.Vector2(-71, 150)
var thirtyNine = new THREE.Vector2(-49, 135)
var forty = new THREE.Vector2(-94, 131)
var fortyOne = new THREE.Vector2(-71, 131)

// Right eye
var fortyTwo = new THREE.Vector2(49, 135)
var fortyThree = new THREE.Vector2(71, 150)
var fortyFour = new THREE.Vector2(94, 150)
var fortyFive = new THREE.Vector2(113, 138)
var fortySix = new THREE.Vector2(94, 131)
var fortySeven = new THREE.Vector2(71, 131)

var eyeColour = 0xffffff
var material = new THREE.MeshLambertMaterial({ color: eyeColour })

var leftEyeCurve = new THREE.SplineCurve([
  thirtySix, thirtySeven, thirtyEight, thirtyNine, forty, fortyOne, thirtySix
])

var rightEyeCurve = new THREE.SplineCurve([
  fortyFive, fortySix, fortySeven, fortyTwo, fortyThree, fortyFour, fortyFive
])

var extrudeSettings = {
  steps: 1,
  depth: 15,
  bevelEnabled: false,
  bevelThickness: 100,
  bevelSize: 50,
  bevelOffset: 50,
  bevelSegments: 10
}

var leftEyeShape = new THREE.Shape(leftEyeCurve.getSpacedPoints(50))
var geometryLeft = new THREE.ExtrudeGeometry(leftEyeShape, extrudeSettings)
var leftEye = new THREE.Mesh(geometryLeft, material)
generateFace.scene.add(leftEye)

var rightEyeShape = new THREE.Shape(rightEyeCurve.getSpacedPoints(50))
var geometryRight = new THREE.ExtrudeGeometry(rightEyeShape, extrudeSettings)
var rightEye = new THREE.Mesh(geometryRight, material)
generateFace.scene.add(rightEye)

// export {}
