import * as gameLogic from './gameLogic.js'

// Nose markers

var twentySevenL = new THREE.Vector2(-10, 150)
var twentySevenR = new THREE.Vector2(10, 150)
var twentyEightL = new THREE.Vector2(-10, 124)
var twentyEightR = new THREE.Vector2(10, 124)
var twentyNineL = new THREE.Vector2(-10, 98)
var twentyNineR = new THREE.Vector2(10, 98)
var thirtyL = new THREE.Vector2(-15, 72)
var thirtyR = new THREE.Vector2(15, 72)

var thirtyOne = new THREE.Vector2(-33, 42)
var thirtyTwo = new THREE.Vector2(-17, 39)
var thirtyThree = new THREE.Vector2(0, 35)
var thirtyFour = new THREE.Vector2(17, 39)
var thirtyFive = new THREE.Vector2(33, 42)

var noseCurve = new THREE.SplineCurve([ twentySevenL, twentyEightL, twentyNineL, thirtyL, thirtyOne, thirtyTwo, thirtyThree, thirtyFour, thirtyFive,
  thirtyR, twentyNineR, twentyEightR, twentySevenR ])

var extrudeSettings = {
  steps: 1,
  depth: 17,
  bevelEnabled: true,
  bevelThickness: 5,
  bevelSize: 1,
  bevelOffset: 1,
  bevelSegments: 5
}

var skinColour = 0x996633
var material = new THREE.MeshLambertMaterial({ color: skinColour })

var noseShape = new THREE.Shape(noseCurve.getSpacedPoints(50))
var geometry = new THREE.ExtrudeGeometry(noseShape, extrudeSettings)
var nose = new THREE.Mesh(geometry, material)

var update = function () {
  gameLogic.scene.remove(nose)
  noseShape = new THREE.Shape(noseCurve.getSpacedPoints(50))
  geometry = new THREE.ExtrudeGeometry(noseShape, extrudeSettings)
  nose = new THREE.Mesh(geometry, material)
  gameLogic.scene.add(nose)
}

export { skinColour, material, update, thirtyOne, thirtyTwo, thirtyFour, thirtyFive, thirtyThree,
  twentySevenL, twentySevenR, twentyEightL, twentyEightR, twentyNineL, twentyNineR, thirtyL, thirtyR }
