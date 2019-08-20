import * as gameLogic from './gameLogic.js'

// Left brow markers
var seventeen = new THREE.Vector2(-152, 169)
var eighteen = new THREE.Vector2(-130, 193)
var nineteen = new THREE.Vector2(-97, 203)
var twenty = new THREE.Vector2(-62, 203)
var twentyOne = new THREE.Vector2(-28, 192)

// Right brow markers
var twentyTwo = new THREE.Vector2(28, 192)
var twentyThree = new THREE.Vector2(62, 203)
var twentyFour = new THREE.Vector2(97, 203)
var twentyFive = new THREE.Vector2(130, 193)
var twentySix = new THREE.Vector2(152, 169)

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

var leftBrowCurve = new THREE.SplineCurve([seventeen, eighteen, nineteen, twenty, twentyOne, nineteen, seventeen])
var leftBrowShape = new THREE.Shape(leftBrowCurve.getSpacedPoints(30))
var geometryL = new THREE.ExtrudeGeometry(leftBrowShape, extrudeSettings)
var leftBrow = new THREE.Mesh(geometryL, material)

var rightBrowCurve = new THREE.SplineCurve([twentyTwo, twentyThree, twentyFour, twentyFive, twentySix, twentyFour, twentyTwo])
var rightBrowShape = new THREE.Shape(rightBrowCurve.getSpacedPoints(30))
var geometryR = new THREE.ExtrudeGeometry(rightBrowShape, extrudeSettings)
var rightBrow = new THREE.Mesh(geometryR, material)

var update = function () {
  gameLogic.scene.remove(leftBrow)
  leftBrowShape = new THREE.Shape(leftBrowCurve.getSpacedPoints(30))
  geometryL = new THREE.ExtrudeGeometry(leftBrowShape, extrudeSettings)
  leftBrow = new THREE.Mesh(geometryL, material)
  gameLogic.scene.add(leftBrow)

  gameLogic.scene.remove(rightBrow)
  rightBrowShape = new THREE.Shape(rightBrowCurve.getSpacedPoints(30))
  geometryR = new THREE.ExtrudeGeometry(rightBrowShape, extrudeSettings)
  rightBrow = new THREE.Mesh(geometryR, material)
  gameLogic.scene.add(rightBrow)
}

export { browColour, material, update, twentySix, seventeen, twentyOne, twentyTwo, nineteen, twentyFour, eighteen, twenty, twentyThree, twentyFive }
