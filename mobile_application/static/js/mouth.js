import * as gameLogic from './gameLogic.js'
import * as face from './face.js'

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

// var lipColour = 0xff6666
var lipColour = new THREE.Color(face.skinColour)
var red = new THREE.Color(0x33001a)
lipColour.add(red)

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

var extrudeSettingsGap = {
  steps: 1,
  depth: 20,
  bevelEnabled: true,
  bevelThickness: 3,
  bevelSize: 1,
  bevelOffset: 1,
  bevelSegments: 10
}

var mouthGapMaterial = new THREE.MeshLambertMaterial({ color: 0x4d0000 })
var mouthGapCurve = new THREE.SplineCurve([ sixty, sixtyOne, sixtyTwo, sixtyThree, sixtyFour, sixtyFive, sixtySix, sixtySeven ])
var mouthGapShape = new THREE.Shape(mouthGapCurve.getSpacedPoints(30))
var mouthGapGeometry = new THREE.ExtrudeGeometry(mouthGapShape, extrudeSettingsGap)
var mouthGap = new THREE.Mesh(mouthGapGeometry, mouthGapMaterial)

var update = function () {
  gameLogic.scene.remove(upperLip)
  upperLipShape = new THREE.Shape(upperLipCurve.getSpacedPoints(30))
  upperLipGeometry = new THREE.ExtrudeGeometry(upperLipShape, extrudeSettings)
  upperLip = new THREE.Mesh(upperLipGeometry, material)
  gameLogic.scene.add(upperLip)

  gameLogic.scene.remove(lowerLip)
  lowerLipShape = new THREE.Shape(lowerLipCurve.getSpacedPoints(30))
  lowerLipGeometry = new THREE.ExtrudeGeometry(lowerLipShape, extrudeSettings)
  lowerLip = new THREE.Mesh(lowerLipGeometry, material)
  gameLogic.scene.add(lowerLip)

  gameLogic.scene.remove(mouthGap)
  mouthGapShape = new THREE.Shape(mouthGapCurve.getSpacedPoints(30))
  mouthGapGeometry = new THREE.ExtrudeGeometry(mouthGapShape, extrudeSettingsGap)
  mouthGap = new THREE.Mesh(mouthGapGeometry, mouthGapMaterial)
  gameLogic.scene.add(mouthGap)
}

export { update, lipColour, material,
  fortyEight,
  fortyNine,
  fifty,
  fiftyOne,
  fiftyTwo,
  fiftyThree,
  fiftyFour,
  fiftyFive,
  fiftySix,
  fiftySeven,
  fiftyEight,
  fiftyNine,
  sixty,
  sixtyOne,
  sixtyTwo,
  sixtyThree,
  sixtyFour,
  sixtyFive,
  sixtySix,
  sixtySeven }
