import * as gameLogic from './gameLogic.js'
import * as face from './face.js'
import * as eyes from './eyes.js'
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

// NOSE SHADOWS

var shadowLCurve = new THREE.SplineCurve([nose.twentySevenL, nose.twentyEightL, nose.twentyNineL, nose.thirtyL, nose.thirtyOne])
var shadowLShape = new THREE.Shape(shadowLCurve.getSpacedPoints(100))
var shadowLGeometry = new THREE.ExtrudeGeometry(shadowLShape, extrudeSettings)
var shadowL = new THREE.Mesh(shadowLGeometry, shadowMaterial)

var shadowRCurve = new THREE.SplineCurve([nose.twentySevenR, nose.twentyEightR, nose.twentyNineR, nose.thirtyR, nose.thirtyFive])
var shadowRShape = new THREE.Shape(shadowRCurve.getSpacedPoints(100))
var shadowRGeometry = new THREE.ExtrudeGeometry(shadowRShape, extrudeSettings)
var shadowR = new THREE.Mesh(shadowRGeometry, shadowMaterial)

// PHILTRUM SHADOW

var philtrum1 = new THREE.Vector2(-7, 39)
var philtrum2 = new THREE.Vector2(0, 35)
var philtrum3 = new THREE.Vector2(7, 39)
var philtrum4 = new THREE.Vector2(10, 5)
var philtrum5 = new THREE.Vector2(-10, 5)

var philtrumCurve = new THREE.SplineCurve([philtrum1, philtrum2, philtrum3, philtrum4, mouth.fiftyOne, philtrum5])
var philtrumShape = new THREE.Shape(philtrumCurve.getSpacedPoints(100))
var philtrumGeometry = new THREE.ExtrudeGeometry(philtrumShape, extrudeSettings)
var philtrumShadow = new THREE.Mesh(philtrumGeometry, shadowMaterial)

// CHIN SHADOW

var chin1 = new THREE.Vector2(38, -64)
var chin2 = new THREE.Vector2(16, -63)
var chin3 = new THREE.Vector2(0, -57)
var chin4 = new THREE.Vector2(-16, -63)
var chin5 = new THREE.Vector2(-38, -64)

var chinCurve = new THREE.SplineCurve([chin1, chin2, chin3, chin4, chin5])
var chinShape = new THREE.Shape(chinCurve.getSpacedPoints(100))
var chinGeometry = new THREE.ExtrudeGeometry(chinShape, extrudeSettings)
var chinShadow = new THREE.Mesh(chinGeometry, shadowMaterial)


// EYELID SHADOWS 

var eyelidL2 = new THREE.Vector2(-94, 170)
var eyelidL3 = new THREE.Vector2(-71, 170)
var eyelidL4 = new THREE.Vector2(-39, 155)
var eyelidL5 = new THREE.Vector2(-38, 170)
var eyelidL6 = new THREE.Vector2(-62, 173)
var eyelidL7 = new THREE.Vector2(-94, 173)
var eyelidL8 = new THREE.Vector2(-130, 153)

var eyelidR2 = new THREE.Vector2(94, 170)
var eyelidR3 = new THREE.Vector2(71, 170)
var eyelidR4 = new THREE.Vector2(39, 155)
var eyelidR5 = new THREE.Vector2(38, 170)
var eyelidR6 = new THREE.Vector2(62, 173)
var eyelidR7 = new THREE.Vector2(94, 173)
var eyelidR8 = new THREE.Vector2(130, 153)

var eyelidLCurve = new THREE.SplineCurve([eyelidL2, eyelidL3, eyelidL4,
eyelidL5, eyelidL6, eyelidL7, eyelidL8])
var eyelidLShape = new THREE.Shape(eyelidLCurve.getSpacedPoints(100))
var eyelidLGeometry = new THREE.ExtrudeGeometry(eyelidLShape, extrudeSettings)
var eyelidL = new THREE.Mesh(eyelidLGeometry, shadowMaterial)

var eyelidRCurve = new THREE.SplineCurve([eyelidR2, eyelidR3, eyelidR4,
    eyelidR5, eyelidR6, eyelidR7, eyelidR8])
var eyelidRShape = new THREE.Shape(eyelidRCurve.getSpacedPoints(100))
var eyelidRGeometry = new THREE.ExtrudeGeometry(eyelidRShape, extrudeSettings)
var eyelidR = new THREE.Mesh(eyelidRGeometry, shadowMaterial)

// CHEEK SHADOWS

var cheekL1 = new THREE.Vector2(-134, 20)
var cheekL2 = new THREE.Vector2(-162, 129)

var cheekLCurve = new THREE.SplineCurve([face.FH3, face.zero, face.four, face.six, cheekL1, cheekL2])
var cheekLShape = new THREE.Shape(cheekLCurve.getSpacedPoints(100))
var cheekLGeometry = new THREE.ExtrudeGeometry(cheekLShape, extrudeSettings)
var cheekL = new THREE.Mesh(cheekLGeometry, shadowMaterial)

var cheekR1 = new THREE.Vector2(134, 20)
var cheekR2 = new THREE.Vector2(162, 129)

var cheekRCurve = new THREE.SplineCurve([face.FH4, face.sixteen, face.twelve, face.ten, cheekR1, cheekR2])
var cheekRShape = new THREE.Shape(cheekRCurve.getSpacedPoints(100))
var cheekRGeometry = new THREE.ExtrudeGeometry(cheekRShape, extrudeSettings)
var cheekR = new THREE.Mesh(cheekRGeometry, shadowMaterial)

// EYE FLECKS

var radius = 4
var segments = 10
var rings = 10

var geometry = new THREE.SphereGeometry(radius, segments, rings)
var materialPupil = new THREE.MeshLambertMaterial({
  color: 0xffffe6,
  wireframe: false
})

var leftPupil = new THREE.Mesh(geometry, materialPupil)
leftPupil.position.x = -75
leftPupil.position.y = 142
leftPupil.position.z = 23

var rightPupil = new THREE.Mesh(geometry, materialPupil)
rightPupil.position.x = 90
rightPupil.position.y = 142
rightPupil.position.z = 23

// EYELASHES

var lashMaterial = new THREE.MeshLambertMaterial({ color: 0x0d0d0d, transparent: true, opacity: 1 })
var lashExtrude = extrudeSettings
lashExtrude.depth = 16

var eyelashLCurve = new THREE.SplineCurve([eyes.thirtySix, eyes.thirtySeven, eyes.thirtyEight, eyes.thirtyNine,
eyes.thirtyEight, eyes.thirtySeven, eyes.thirtySix])
var eyelashLShape = new THREE.Shape(eyelashLCurve.getSpacedPoints(100))
var eyelashLGeometry = new THREE.ExtrudeGeometry(eyelashLShape, lashExtrude)
var eyelashL = new THREE.Mesh(eyelashLGeometry, lashMaterial)

// var lashMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 100 })

// var eyelashLGeometry = new THREE.Geometry()
// eyelashLGeometry.vertices.push(eyelidL2, eyelidL3, eyelidL6)

// var eyelashL = new THREE.Line( eyelashLGeometry, lashMaterial )
// eyelashL.position.y = 30

// UPDATE

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

  gameLogic.scene.add(eyelidL)
  gameLogic.scene.add(eyelidR)

  gameLogic.scene.remove(cheekL)
  cheekLShape = new THREE.Shape(cheekLCurve.getSpacedPoints(100))
  cheekLGeometry = new THREE.ExtrudeGeometry(cheekLShape, extrudeSettings)
  cheekL = new THREE.Mesh(cheekLGeometry, shadowMaterial)
  gameLogic.scene.add(cheekL)

  gameLogic.scene.remove(cheekR)
  cheekRShape = new THREE.Shape(cheekRCurve.getSpacedPoints(100))
  cheekRGeometry = new THREE.ExtrudeGeometry(cheekRShape, extrudeSettings)
  cheekR = new THREE.Mesh(cheekRGeometry, shadowMaterial)
  gameLogic.scene.add(cheekR) 

  gameLogic.scene.add(leftPupil)
  gameLogic.scene.add(rightPupil)

  gameLogic.scene.remove(eyelashL)
  eyelashLShape = new THREE.Shape(eyelashLCurve.getSpacedPoints(100))
  eyelashLGeometry = new THREE.ExtrudeGeometry(eyelashLShape, lashExtrude)
  eyelashL = new THREE.Mesh(eyelashLGeometry, lashMaterial)
  gameLogic.scene.add(eyelashL)
}

export { update, shadowMaterial, cheekR1, cheekR2, cheekL1, cheekL2 }
