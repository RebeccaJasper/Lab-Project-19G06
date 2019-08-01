import * as gameLogic from './gameLogic.js'

// Nose markers
var twentySeven = new THREE.Vector2(0, 150)
var twentyEight = new THREE.Vector2(0, 124)
var twentyNine = new THREE.Vector2(0, 98)
var thirty = new THREE.Vector2(0, 72)
var thirtyOne = new THREE.Vector2(-33, 42)
var thirtyTwo = new THREE.Vector2(-17, 39)
var thirtyThree = new THREE.Vector2(0, 35)
var thirtyFour = new THREE.Vector2(17, 39)
var thirtyFive = new THREE.Vector2(33, 42)

var noseCurve = new THREE.SplineCurve([ twentySeven, twentyEight, twentyNine, thirty, thirtyOne, thirtyTwo, thirtyThree, thirtyFour, thirtyFive,
  thirty, twentyNine, twentyEight, twentySeven ])

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

var noseShape = new THREE.Shape(noseCurve.getSpacedPoints(100))
var geometry = new THREE.ExtrudeGeometry(noseShape, extrudeSettings)
var nose = new THREE.Mesh(geometry, material)

var update = function () {
  gameLogic.scene.remove(nose)
  noseShape = new THREE.Shape(noseCurve.getSpacedPoints(100))
  geometry = new THREE.ExtrudeGeometry(noseShape, extrudeSettings)
  nose = new THREE.Mesh(geometry, material)
  gameLogic.scene.add(nose)
}

export { skinColour, material, update, thirtyOne, thirtyFive, thirtyThree }
