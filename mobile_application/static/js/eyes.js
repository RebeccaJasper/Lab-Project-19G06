import * as gameLogic from './gameLogic.js'

// Facial markers related to Dlib are numbered
// Left eye
var thirtySix = new THREE.Vector2(-113, 138)
var thirtySeven = new THREE.Vector2(-94, 150)
var thirtyEight = new THREE.Vector2(-71, 150)
var thirtyNine = new THREE.Vector2(-49, 135)
var forty = new THREE.Vector2(-71, 131)
var fortyOne = new THREE.Vector2(-94, 131)

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
  bevelEnabled: true,
  bevelThickness: 3,
  bevelSize: 1,
  bevelOffset: 1,
  bevelSegments: 10
}

var leftEyeShape = new THREE.Shape(leftEyeCurve.getSpacedPoints(50))
var geometryLeft = new THREE.ExtrudeGeometry(leftEyeShape, extrudeSettings)
var leftEye = new THREE.Mesh(geometryLeft, material)
// gameLogic.scene.add(leftEye)

var rightEyeShape = new THREE.Shape(rightEyeCurve.getSpacedPoints(50))
var geometryRight = new THREE.ExtrudeGeometry(rightEyeShape, extrudeSettings)
var rightEye = new THREE.Mesh(geometryRight, material)
// gameLogic.scene.add(rightEye)

var update = function () {
  gameLogic.scene.remove(leftEye)
  var leftEyeShape = new THREE.Shape(leftEyeCurve.getSpacedPoints(50))
  var geometryLeft = new THREE.ExtrudeGeometry(leftEyeShape, extrudeSettings)
  leftEye = new THREE.Mesh(geometryLeft, material)
  gameLogic.scene.add(leftEye)

  gameLogic.scene.remove(rightEye)
  var rightEyeShape = new THREE.Shape(rightEyeCurve.getSpacedPoints(50))
  var geometryRight = new THREE.ExtrudeGeometry(rightEyeShape, extrudeSettings)
  rightEye = new THREE.Mesh(geometryRight, material)
  gameLogic.scene.add(rightEye)
}

export { thirtySix, thirtySeven, thirtyEight, thirtyNine, forty, fortyOne, fortyTwo, fortyThree,
  fortyFour, fortyFive, fortySix, fortySeven, eyeColour, material, update }
