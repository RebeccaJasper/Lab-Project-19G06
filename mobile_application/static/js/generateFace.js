import * as gameLogic from './gameLogic.js'

// Draw the face

var skinColour = 0x996633
var material = new THREE.MeshLambertMaterial({ color: skinColour })

// Facial markers related to Dlib are numbered

// Face shape
var zero = new THREE.Vector2(-177, 120)
var four = new THREE.Vector2(-147, -44)
var six = new THREE.Vector2(-88, -104)
var seven = new THREE.Vector2(-46, -122)
var eight = new THREE.Vector2(0, -128)
var nine = new THREE.Vector2(46, -122)
var ten = new THREE.Vector2(88, -104)
var twelve = new THREE.Vector2(147, -44)
var sixteen = new THREE.Vector2(177, 120)

// Facial markers added to make face look better
// FH = forehead markers
var FH0 = new THREE.Vector2(0, 320)
var FH1 = new THREE.Vector2(-88, 310)
var FH2 = new THREE.Vector2(88, 310)
var FH3 = new THREE.Vector2(-147, 250)
var FH4 = new THREE.Vector2(147, 250)

var faceCurve = new THREE.SplineCurve([
  FH0, FH1, FH3, zero, four, six, seven, eight, nine, ten, twelve, sixteen, FH4, FH2, FH0
])

var extrudeSettings = {
  steps: 1,
  depth: 10,
  bevelEnabled: true,
  bevelThickness: 3,
  bevelSize: 1,
  bevelOffset: 1,
  bevelSegments: 10
}

var faceShape = new THREE.Shape(faceCurve.getSpacedPoints(100))
var geometry = new THREE.ExtrudeGeometry(faceShape, extrudeSettings)
var face = new THREE.Mesh(geometry, material)

var update = function () {
  gameLogic.scene.remove(face)
  var faceShape = new THREE.Shape(faceCurve.getSpacedPoints(100))
  var geometry = new THREE.ExtrudeGeometry(faceShape, extrudeSettings)
  face = new THREE.Mesh(geometry, material)
  gameLogic.scene.add(face)
}

function dec2hex (i) {
  var result = '0x000000'
  if (i >= 0 && i <= 15) { result = '0x00000' + i.toString(16) } else if (i >= 16 && i <= 255) { result = '0x0000' + i.toString(16) } else if (i >= 256 && i <= 4095) { result = '0x000' + i.toString(16) } else if (i >= 4096 && i <= 65535) { result = '0x00' + i.toString(16) } else if (i >= 65535 && i <= 1048575) { result = '0x0' + i.toString(16) } else if (i >= 1048575) { result = '0x' + i.toString(16) }
  if (result.length === 8) { return result }
}

export { skinColour, material, zero, four, six, seven, nine, ten, eight, twelve, FH0, FH1, FH2, sixteen, dec2hex, update }
