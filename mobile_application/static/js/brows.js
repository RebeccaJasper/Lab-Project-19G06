import * as gameLogic from './gameLogic.js'

// Left brow markers
var seventeen = new THREE.Vector2(-145, 166)
var eighteen = new THREE.Vector2(-125, 191)
var nineteen = new THREE.Vector2(-94, 202)
var twenty = new THREE.Vector2(-59, 201)
var twentyOne = new THREE.Vector2(-27, 190)

// Right brow markers
var twentyTwo = new THREE.Vector2(30, 194)
var twentyThree = new THREE.Vector2(64, 205)
var twentyFour = new THREE.Vector2(100, 205)
var twentyFive = new THREE.Vector2(134, 195)
var twentySix = new THREE.Vector2(158, 171)

var extrudeSettings = {
  steps: 1,
  depth: 15,
  bevelEnabled: true,
  bevelThickness: 3,
  bevelSize: 1,
  bevelOffset: 1,
  bevelSegments: 10
}

var browColour = 0x331a00
var material = new THREE.MeshLambertMaterial({ color: browColour })

var leftBrowCurve = new THREE.SplineCurve([seventeen, eighteen, nineteen, twenty, twentyOne])
var leftBrowShape = new THREE.Shape(leftBrowCurve.getSpacedPoints(100))
var geometryL = new THREE.ExtrudeGeometry(leftBrowShape, extrudeSettings)
var leftBrow = new THREE.Mesh(geometryL, material)

var rightBrowCurve = new THREE.SplineCurve([twentyTwo, twentyThree, twentyFour, twentyFive, twentySix])
var rightBrowShape = new THREE.Shape(rightBrowCurve.getSpacedPoints(100))
var geometryR = new THREE.ExtrudeGeometry(rightBrowShape, extrudeSettings)
var rightBrow = new THREE.Mesh(geometryR, material)

var update = function () {
  gameLogic.scene.remove(leftBrow)
  leftBrowShape = new THREE.Shape(leftBrowCurve.getSpacedPoints(100))
  geometryL = new THREE.ExtrudeGeometry(leftBrowShape, extrudeSettings)
  leftBrow = new THREE.Mesh(geometryL, material)
  gameLogic.scene.add(leftBrow)

  gameLogic.scene.remove(rightBrow)
  rightBrowShape = new THREE.Shape(rightBrowCurve.getSpacedPoints(100))
  geometryR = new THREE.ExtrudeGeometry(rightBrowShape, extrudeSettings)
  rightBrow = new THREE.Mesh(geometryR, material)
  gameLogic.scene.add(rightBrow)
}

export { browColour, material, update }
