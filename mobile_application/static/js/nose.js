import * as gameLogic from './gameLogic.js'

// Nose markers
var twentySeven = new THREE.Vector2(-2, 150)
var twentyEight = new THREE.Vector2(-2, 124)
var twentyNine = new THREE.Vector2(-3, 98)
var thirty = new THREE.Vector2(-4, 72)
var thirtyOne = new THREE.Vector2(-34, 42)
var thirtyTwo = new THREE.Vector2(-18, 38)
var thirtyThree = new THREE.Vector2(-2, 35)
var thirtyFour = new THREE.Vector2(15, 39)
var thirtyFive = new THREE.Vector2(32, 42)

var noseCurve = new THREE.SplineCurve([ twentySeven, twentyEight, twentyNine, thirty, thirtyOne, thirtyTwo, thirtyThree, thirtyFour, thirtyFive,
  thirty, twentyNine, twentyEight, twentySeven ])

var extrudeSettings = {
  steps: 1,
  depth: 17,
  bevelEnabled: true,
  bevelThickness: 3,
  bevelSize: 1,
  bevelOffset: 1,
  bevelSegments: 10
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

export { skinColour, material, update }
