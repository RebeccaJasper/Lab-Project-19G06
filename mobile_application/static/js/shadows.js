import * as gameLogic from './gameLogic.js'
import * as face from './face.js'
// import * as eyes from './eyes.js'
import * as mouth from './mouth.js'
import * as nose from './nose.js'
// import * as brows from './brows.js'

var extrudeSettings = {
  steps: 1,
  depth: 13,
  bevelEnabled: true,
  bevelThickness: 5,
  bevelSize: 1,
  bevelOffset: 1,
  bevelSegments: 5
}

var shadowColour = (face.skinColour & 0xfefefe) >> 1
var shadowMaterial = new THREE.MeshLambertMaterial({ color: shadowColour, transparent: true, opacity: 0.2 })

var shadowLCurve = new THREE.SplineCurve([nose.twentySevenL, nose.twentyEightL, nose.twentyNineL, nose.thirtyL, nose.thirtyOne])
var shadowLShape = new THREE.Shape(shadowLCurve.getSpacedPoints(100))
var shadowLGeometry = new THREE.ExtrudeGeometry(shadowLShape, extrudeSettings)
var shadowL = new THREE.Mesh(shadowLGeometry, shadowMaterial)

var shadowRCurve = new THREE.SplineCurve([nose.twentySevenR, nose.twentyEightR, nose.twentyNineR, nose.thirtyR, nose.thirtyFive])
var shadowRShape = new THREE.Shape(shadowRCurve.getSpacedPoints(100))
var shadowRGeometry = new THREE.ExtrudeGeometry(shadowRShape, extrudeSettings)
var shadowR = new THREE.Mesh(shadowRGeometry, shadowMaterial)

var philtrum1 = new THREE.Vector2(-7, 39)
var philtrum2 = new THREE.Vector2(0, 35)
var philtrum3 = new THREE.Vector2(7, 39)
var philtrum4 = new THREE.Vector2(10, 5)
var philtrum5 = new THREE.Vector2(-10, 5)

var philtrumCurve = new THREE.SplineCurve([philtrum1, philtrum2, philtrum3, philtrum4, mouth.fiftyOne, philtrum5])
var philtrumShape = new THREE.Shape(philtrumCurve.getSpacedPoints(100))
var philtrumGeometry = new THREE.ExtrudeGeometry(philtrumShape, extrudeSettings)
var philtrumShadow = new THREE.Mesh(philtrumGeometry, shadowMaterial)

var chin1 = new THREE.Vector2(38, -64)
var chin2 = new THREE.Vector2(16, -63)
var chin3 = new THREE.Vector2(0, -57)
var chin4 = new THREE.Vector2(-16, -63)
var chin5 = new THREE.Vector2(-38, -64)

var chinCurve = new THREE.SplineCurve([chin1, chin2, chin3, chin4, chin5])
var chinShape = new THREE.Shape(chinCurve.getSpacedPoints(100))
var chinGeometry = new THREE.ExtrudeGeometry(chinShape, extrudeSettings)
var chinShadow = new THREE.Mesh(chinGeometry, shadowMaterial)

var update = function () {
  gameLogic.scene.remove(shadowL)
  shadowLShape = new THREE.Shape(shadowLCurve.getSpacedPoints(100))
  shadowLGeometry = new THREE.ExtrudeGeometry(shadowLShape, extrudeSettings)
  shadowL = new THREE.Mesh(shadowLGeometry, shadowMaterial)
  gameLogic.scene.add(shadowL)

  gameLogic.scene.remove(shadowR)
  shadowRShape = new THREE.Shape(shadowRCurve.getSpacedPoints(100))
  shadowRGeometry = new THREE.ExtrudeGeometry(shadowRShape, extrudeSettings)
  shadowR = new THREE.Mesh(shadowRGeometry, shadowMaterial)
  gameLogic.scene.add(shadowR)

  gameLogic.scene.remove(philtrumShadow)
  philtrumShape = new THREE.Shape(philtrumCurve.getSpacedPoints(100))
  philtrumGeometry = new THREE.ExtrudeGeometry(philtrumShape, extrudeSettings)
  philtrumShadow = new THREE.Mesh(philtrumGeometry, shadowMaterial)
  gameLogic.scene.add(philtrumShadow)

  gameLogic.scene.remove(chinShadow)
  chinShape = new THREE.Shape(chinCurve.getSpacedPoints(100))
  chinGeometry = new THREE.ExtrudeGeometry(chinShape, extrudeSettings)
  chinShadow = new THREE.Mesh(chinGeometry, shadowMaterial)
  gameLogic.scene.add(chinShadow)
}

export { update, shadowMaterial }
