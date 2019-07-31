import * as gameLogic from './gameLogic.js'

// Mouth markers
var fortyEight = new THREE.Vector2(-64, -20)
var fortyNine = new THREE.Vector2(-38, -6)
var fifty = new THREE.Vector2(-15, 5)
var fiftyOne = new THREE.Vector2(0, 0)
var fiftyTwo = new THREE.Vector2(15, 5)
var fiftyThree = new THREE.Vector2(38, -6)
var fiftyFour = new THREE.Vector2(64, -20)
var fiftyFive = new THREE.Vector2(38, -32)
var fiftySix = new THREE.Vector2(16, -38)
var fiftySeven = new THREE.Vector2(0, -39)
var fiftyEight = new THREE.Vector2(-16, -38)
var fiftyNine = new THREE.Vector2(-38, -32)
var sixty = new THREE.Vector2(-53, -20)
var sixtyOne = new THREE.Vector2(-15, -14)
var sixtyTwo = new THREE.Vector2(0, -15)
var sixtyThree = new THREE.Vector2(15, -14)
var sixtyFour = new THREE.Vector2(53, -20)
var sixtyFive = new THREE.Vector2(15, -15)
var sixtySix = new THREE.Vector2(0, -17)
var sixtySeven = new THREE.Vector2(-15, -15)

var lipColour = 0xff6666
var material = new THREE.MeshLambertMaterial({ color: lipColour })

var extrudeSettings = {
  steps: 1,
  depth: 17,
  bevelEnabled: true,
  bevelThickness: 3,
  bevelSize: 1,
  bevelOffset: 1,
  bevelSegments: 10
}

var upperLipCurve = new THREE.SplineCurve([ fortyEight, fortyNine, fifty, fiftyOne, fiftyTwo, fiftyThree, fiftyFour,
  sixtyFour, sixtyThree, sixtyTwo, sixtyOne, sixty ])
var upperLipShape = new THREE.Shape(upperLipCurve.getSpacedPoints(30))
var upperLipGeometry = new THREE.ExtrudeGeometry(upperLipShape, extrudeSettings)
var upperLip = new THREE.Mesh(upperLipGeometry, material)

var lowerLipCurve = new THREE.SplineCurve([ fortyEight, sixtySeven, sixtySix, sixtyFive, fiftyFour,
  fiftyFive, fiftySix, fiftySeven, fiftyEight, fiftyNine ])
var lowerLipShape = new THREE.Shape(lowerLipCurve.getSpacedPoints(30))
var lowerLipGeometry = new THREE.ExtrudeGeometry(lowerLipShape, extrudeSettings)
var lowerLip = new THREE.Mesh(lowerLipGeometry, material)

var update = function () {
  gameLogic.scene.remove(upperLip)
  var upperLipShape = new THREE.Shape(upperLipCurve.getSpacedPoints(30))
  var upperLipGeometry = new THREE.ExtrudeGeometry(upperLipShape, extrudeSettings)
  upperLip = new THREE.Mesh(upperLipGeometry, material)
  gameLogic.scene.add(upperLip)

  gameLogic.scene.remove(lowerLip)
  var lowerLipShape = new THREE.Shape(lowerLipCurve.getSpacedPoints(30))
  var lowerLipGeometry = new THREE.ExtrudeGeometry(lowerLipShape, extrudeSettings)
  lowerLip = new THREE.Mesh(lowerLipGeometry, material)
  gameLogic.scene.add(lowerLip)
}

export { fortyEight, fiftyFour, fortyNine, fiftyThree, fifty, fiftyTwo, fiftyOne, fiftyFive,
  fiftySix, fiftySeven, fiftyEight, fiftyNine, update }
