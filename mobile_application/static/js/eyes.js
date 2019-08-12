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

var leftEyeShape = new THREE.Shape(leftEyeCurve.getSpacedPoints(30))
var geometryLeft = new THREE.ExtrudeGeometry(leftEyeShape, extrudeSettings)
var leftEye = new THREE.Mesh(geometryLeft, material)

var rightEyeShape = new THREE.Shape(rightEyeCurve.getSpacedPoints(30))
var geometryRight = new THREE.ExtrudeGeometry(rightEyeShape, extrudeSettings)
var rightEye = new THREE.Mesh(geometryRight, material)

var extrudeSettingsCircle = {
  steps: 1,
  depth: 17,
  bevelEnabled: true,
  bevelThickness: 3,
  bevelSize: 1,
  bevelOffset: 1,
  bevelSegments: 10
}

var irisColour = 0x331a00
var circleMaterial = new THREE.MeshLambertMaterial({ color: irisColour })
var circleCurveLeft = new THREE.SplineCurve([ thirtySeven, thirtyEight, forty, fortyOne, thirtySeven ])
var leftCircleShape = new THREE.Shape(circleCurveLeft.getSpacedPoints(20))
var geometryCircleLeft = new THREE.ExtrudeGeometry(leftCircleShape, extrudeSettingsCircle)
var leftCircle = new THREE.Mesh(geometryCircleLeft, circleMaterial)

var circleCurveRight = new THREE.SplineCurve([ fortyThree, fortyFour, fortySix, fortySeven ])
var rightCircleShape = new THREE.Shape(circleCurveRight.getSpacedPoints(20))
var geometryCircleRight = new THREE.ExtrudeGeometry(rightCircleShape, extrudeSettingsCircle)
var rightCircle = new THREE.Mesh(geometryCircleRight, circleMaterial)

var radius = 8
var segments = 50
var rings = 30

var geometry = new THREE.SphereGeometry(radius, segments, rings)
var materialPupil = new THREE.MeshLambertMaterial({
  color: 0x0d0d0d,
  wireframe: false
})

var leftPupil = new THREE.Mesh(geometry, materialPupil)
leftPupil.position.x = thirtySeven.x - (thirtySeven.x - thirtyEight.x) / 2
leftPupil.position.y = thirtySeven.y - (thirtySeven.y - fortyOne.y) / 2
leftPupil.position.z = 20

var rightPupil = new THREE.Mesh(geometry, materialPupil)
rightPupil.position.x = fortyThree.x - (fortyThree.x - fortyFour.x) / 2
rightPupil.position.y = fortyThree.y - (fortyThree.y - fortySeven.y) / 2
rightPupil.position.z = 20

var update = function () {
  gameLogic.scene.remove(leftEye)
  leftEyeShape = new THREE.Shape(leftEyeCurve.getSpacedPoints(30))
  geometryLeft = new THREE.ExtrudeGeometry(leftEyeShape, extrudeSettings)
  leftEye = new THREE.Mesh(geometryLeft, material)
  gameLogic.scene.add(leftEye)

  gameLogic.scene.remove(rightEye)
  rightEyeShape = new THREE.Shape(rightEyeCurve.getSpacedPoints(30))
  geometryRight = new THREE.ExtrudeGeometry(rightEyeShape, extrudeSettings)
  rightEye = new THREE.Mesh(geometryRight, material)
  gameLogic.scene.add(rightEye)

  gameLogic.scene.remove(leftCircle)
  leftCircleShape = new THREE.Shape(circleCurveLeft.getSpacedPoints(20))
  geometryCircleLeft = new THREE.ExtrudeGeometry(leftCircleShape, extrudeSettingsCircle)
  leftCircle = new THREE.Mesh(geometryCircleLeft, circleMaterial)
  gameLogic.scene.add(leftCircle)

  gameLogic.scene.remove(rightCircle)
  rightCircleShape = new THREE.Shape(circleCurveRight.getSpacedPoints(20))
  geometryCircleRight = new THREE.ExtrudeGeometry(rightCircleShape, extrudeSettingsCircle)
  rightCircle = new THREE.Mesh(geometryCircleRight, circleMaterial)
  gameLogic.scene.add(rightCircle)

  gameLogic.scene.add(leftPupil)
  gameLogic.scene.add(rightPupil)
}

export { thirtySix, thirtySeven, thirtyEight, thirtyNine, forty, fortyOne, fortyTwo, fortyThree,
  fortyFour, fortyFive, fortySix, fortySeven, eyeColour, material, update, irisColour, circleMaterial }
