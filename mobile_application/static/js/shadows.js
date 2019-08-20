import * as gameLogic from './gameLogic.js'
import * as face from './face.js'
import * as eyes from './eyes.js'
import * as mouth from './mouth.js'
import * as nose from './nose.js'
// import * as brows from './brows.js'

var extrudeSettings = {
  steps: 1,
  depth: 10,
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
var shadowLShape = new THREE.Shape(shadowLCurve.getSpacedPoints(30))
var shadowLGeometry = new THREE.ExtrudeGeometry(shadowLShape, extrudeSettings)
var shadowL = new THREE.Mesh(shadowLGeometry, shadowMaterial)

var shadowRCurve = new THREE.SplineCurve([nose.twentySevenR, nose.twentyEightR, nose.twentyNineR, nose.thirtyR, nose.thirtyFive])
var shadowRShape = new THREE.Shape(shadowRCurve.getSpacedPoints(30))
var shadowRGeometry = new THREE.ExtrudeGeometry(shadowRShape, extrudeSettings)
var shadowR = new THREE.Mesh(shadowRGeometry, shadowMaterial)

// PHILTRUM SHADOW

var philtrum1 = new THREE.Vector2(-7, 39)
var philtrum2 = new THREE.Vector2(0, 35)
var philtrum3 = new THREE.Vector2(7, 39)
var philtrum4 = new THREE.Vector2(10, 5)
var philtrum5 = new THREE.Vector2(-10, 5)

var philtrumCurve = new THREE.SplineCurve([philtrum1, philtrum2, philtrum3, philtrum4, mouth.fiftyOne, philtrum5])
var philtrumShape = new THREE.Shape(philtrumCurve.getSpacedPoints(30))
var philtrumGeometry = new THREE.ExtrudeGeometry(philtrumShape, extrudeSettings)
var philtrumShadow = new THREE.Mesh(philtrumGeometry, shadowMaterial)

// CHIN SHADOW

var chin1 = new THREE.Vector2(38, -64)
var chin2 = new THREE.Vector2(16, -63)
var chin3 = new THREE.Vector2(0, -57)
var chin4 = new THREE.Vector2(-16, -63)
var chin5 = new THREE.Vector2(-38, -64)

var chinCurve = new THREE.SplineCurve([chin1, chin2, chin3, chin4, chin5])
var chinShape = new THREE.Shape(chinCurve.getSpacedPoints(30))
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
var eyelidLShape = new THREE.Shape(eyelidLCurve.getSpacedPoints(30))
var eyelidLGeometry = new THREE.ExtrudeGeometry(eyelidLShape, extrudeSettings)
var eyelidL = new THREE.Mesh(eyelidLGeometry, shadowMaterial)

var eyelidRCurve = new THREE.SplineCurve([eyelidR2, eyelidR3, eyelidR4,
  eyelidR5, eyelidR6, eyelidR7, eyelidR8])
var eyelidRShape = new THREE.Shape(eyelidRCurve.getSpacedPoints(30))
var eyelidRGeometry = new THREE.ExtrudeGeometry(eyelidRShape, extrudeSettings)
var eyelidR = new THREE.Mesh(eyelidRGeometry, shadowMaterial)

// CHEEK SHADOWS

var cheekL1 = new THREE.Vector2(-140, -30)
var cheekL2 = new THREE.Vector2(-150, 0)
var cheekL3 = new THREE.Vector2(-162, 105)

var cheekLCurve = new THREE.SplineCurve([ face.zero, face.four, face.six, cheekL1, cheekL2, cheekL3 ])
var cheekLShape = new THREE.Shape(cheekLCurve.getSpacedPoints(30))
var cheekLGeometry = new THREE.ExtrudeGeometry(cheekLShape, extrudeSettings)
var cheekL = new THREE.Mesh(cheekLGeometry, shadowMaterial)

var cheekR1 = new THREE.Vector2(140, -30)
var cheekR2 = new THREE.Vector2(150, 0)
var cheekR3 = new THREE.Vector2(162, 105)

var cheekRCurve = new THREE.SplineCurve([face.sixteen, face.twelve, face.ten, cheekR1, cheekR2, cheekR3])
var cheekRShape = new THREE.Shape(cheekRCurve.getSpacedPoints(30))
var cheekRGeometry = new THREE.ExtrudeGeometry(cheekRShape, extrudeSettings)
var cheekR = new THREE.Mesh(cheekRGeometry, shadowMaterial)

// EYE BAG SHADOWS
var eyebagL1 = new THREE.Vector2(-115, 128)
var eyebagL2 = new THREE.Vector2(-94, 120)
var eyebagL3 = new THREE.Vector2(-71, 120)
var eyebagL4 = new THREE.Vector2(-42, 122)
var eyebagL5 = new THREE.Vector2(-49, 107)
var eyebagL6 = new THREE.Vector2(-90, 110)

var eyebagLCurve = new THREE.SplineCurve([ eyebagL1, eyebagL2, eyebagL3, eyebagL4, eyebagL5, eyebagL6 ])
var eyebagLShape = new THREE.Shape(eyebagLCurve.getSpacedPoints(30))
var eyebagLGeometry = new THREE.ExtrudeGeometry(eyebagLShape, extrudeSettings)
var eyebagL = new THREE.Mesh(eyebagLGeometry, shadowMaterial)

var eyebagR1 = new THREE.Vector2(115, 128)
var eyebagR2 = new THREE.Vector2(94, 120)
var eyebagR3 = new THREE.Vector2(71, 120)
var eyebagR4 = new THREE.Vector2(42, 122)
var eyebagR5 = new THREE.Vector2(49, 107)
var eyebagR6 = new THREE.Vector2(90, 110)

var eyebagRCurve = new THREE.SplineCurve([ eyebagR1, eyebagR2, eyebagR3, eyebagR4, eyebagR5, eyebagR6 ])
var eyebagRShape = new THREE.Shape(eyebagRCurve.getSpacedPoints(30))
var eyebagRGeometry = new THREE.ExtrudeGeometry(eyebagRShape, extrudeSettings)
var eyebagR = new THREE.Mesh(eyebagRGeometry, shadowMaterial)

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

var lashExtrude = {
  steps: 5,
  depth: 25,
  bevelEnabled: false
}

var lashMaterial = new THREE.MeshLambertMaterial({ color: 0x0d0d0d, transparent: true, opacity: 1 })

var eyelashLCurve = new THREE.SplineCurve([eyes.thirtySix, eyes.thirtySeven, eyes.thirtyEight, eyes.thirtyNine,
  eyes.thirtyEight, eyes.thirtySeven, eyes.thirtySix])
var eyelashLShape = new THREE.Shape(eyelashLCurve.getSpacedPoints(30))
var eyelashLGeometry = new THREE.ExtrudeGeometry(eyelashLShape, lashExtrude)
var eyelashL = new THREE.Mesh(eyelashLGeometry, lashMaterial)

var eyelashRCurve = new THREE.SplineCurve([ eyes.fortyFive,
  eyes.fortyFour, eyes.fortyThree, eyes.fortyTwo, eyes.fortyThree, eyes.fortyFour, eyes.fortyFive ])
var eyelashRShape = new THREE.Shape(eyelashRCurve.getSpacedPoints(30))
var eyelashRGeometry = new THREE.ExtrudeGeometry(eyelashRShape, lashExtrude)
var eyelashR = new THREE.Mesh(eyelashRGeometry, lashMaterial)

// NOSE HIGHLIGHT

var highlightColour = new THREE.Color(face.skinColour)
highlightColour.offsetHSL(0, 0, 0.15)
var highlightMaterial = new THREE.MeshLambertMaterial({ color: highlightColour, transparent: true, opacity: 0.2 })

var noseH1 = new THREE.Vector2(-2, 140)
var noseH2 = new THREE.Vector2(-2, 124)
var noseH3 = new THREE.Vector2(-2, 88)
var noseH4 = new THREE.Vector2(-7, 52)
var noseH5 = new THREE.Vector2(7, 52)
var noseH6 = new THREE.Vector2(2, 88)
var noseH7 = new THREE.Vector2(2, 124)
var noseH8 = new THREE.Vector2(2, 140)

var noseHExtrude = {
  steps: 1,
  depth: 20,
  bevelEnabled: true,
  bevelThickness: 5,
  bevelSize: 1,
  bevelOffset: 1,
  bevelSegments: 5
}

var noseHighCurve = new THREE.SplineCurve([ noseH1, noseH2, noseH3, noseH4,
  noseH5, noseH6, noseH7, noseH8 ])
var noseHighShape = new THREE.Shape(noseHighCurve.getSpacedPoints(30))
var noseHighGeometry = new THREE.ExtrudeGeometry(noseHighShape, noseHExtrude)
var noseHigh = new THREE.Mesh(noseHighGeometry, highlightMaterial)

var extrudeSettingsH = {
  steps: 1,
  depth: 10,
  bevelEnabled: true,
  bevelThickness: 5,
  bevelSize: 1,
  bevelOffset: 1,
  bevelSegments: 5
}

// CHIN HIGHLIGHT

var chinH1 = new THREE.Vector2(-34, -80)
var chinH2 = new THREE.Vector2(34, -80)
var chinH3 = new THREE.Vector2(34, -100)
var chinH4 = new THREE.Vector2(-34, -100)

var chinHCurve = new THREE.SplineCurve([chinH1, chinH2, chinH3, chinH4, chinH1])
var chinHShape = new THREE.Shape(chinHCurve.getSpacedPoints(30))
var chinHGeometry = new THREE.ExtrudeGeometry(chinHShape, extrudeSettingsH)
var chinHighlight = new THREE.Mesh(chinHGeometry, highlightMaterial)

// CHEEK HIGHLIGHTS

var cheekHR1 = new THREE.Vector2(140, 118)
var cheekHR2 = new THREE.Vector2(49, 105)
var cheekHR3 = new THREE.Vector2(124, 0)
var cheekHR4 = new THREE.Vector2(100, 105)

var cheekHRCurve = new THREE.SplineCurve([ cheekHR2, cheekHR4, cheekHR1, cheekHR3, cheekHR2 ])
var cheekHRShape = new THREE.Shape(cheekHRCurve.getSpacedPoints(30))
var cheekHRGeometry = new THREE.ExtrudeGeometry(cheekHRShape, extrudeSettingsH)
var cheekRHighlight = new THREE.Mesh(cheekHRGeometry, highlightMaterial)

var cheekHL1 = new THREE.Vector2(-140, 118)
var cheekHL2 = new THREE.Vector2(-49, 105)
var cheekHL3 = new THREE.Vector2(-124, 0)
var cheekHL4 = new THREE.Vector2(-100, 105)

var cheekHLCurve = new THREE.SplineCurve([ cheekHL2, cheekHL4, cheekHL1, cheekHL3, cheekHL2 ])
var cheekHLShape = new THREE.Shape(cheekHLCurve.getSpacedPoints(100))
var cheekHLGeometry = new THREE.ExtrudeGeometry(cheekHLShape, extrudeSettingsH)
var cheekLHighlight = new THREE.Mesh(cheekHLGeometry, highlightMaterial)

// FOREHEAD HIGHLIGHT

var foreheadH1 = new THREE.Vector2(-147, 195)
var foreheadH2 = new THREE.Vector2(-145, 220)
var foreheadH3 = new THREE.Vector2(-95, 280)
var foreheadH4 = new THREE.Vector2(95, 280)
var foreheadH5 = new THREE.Vector2(145, 220)
var foreheadH6 = new THREE.Vector2(147, 195)
var foreheadH7 = new THREE.Vector2(97, 220)
var foreheadH8 = new THREE.Vector2(0, 210)
var foreheadH9 = new THREE.Vector2(-97, 220)

var foreheadHCurve = new THREE.SplineCurve([foreheadH1, foreheadH2, foreheadH3, foreheadH4,
  foreheadH5, foreheadH6, foreheadH7, foreheadH8, foreheadH9, foreheadH1 ])
var foreheadHShape = new THREE.Shape(foreheadHCurve.getSpacedPoints(30))
var foreheadHGeometry = new THREE.ExtrudeGeometry(foreheadHShape, extrudeSettingsH)
var foreheadHighlight = new THREE.Mesh(foreheadHGeometry, highlightMaterial)

// UPDATE

var update = function () {
  // SHADOWS

  gameLogic.scene.remove(shadowL)
  shadowLShape = new THREE.Shape(shadowLCurve.getSpacedPoints(30))
  shadowLGeometry = new THREE.ExtrudeGeometry(shadowLShape, extrudeSettings)
  shadowL = new THREE.Mesh(shadowLGeometry, shadowMaterial)
  gameLogic.scene.add(shadowL)

  gameLogic.scene.remove(shadowR)
  shadowRShape = new THREE.Shape(shadowRCurve.getSpacedPoints(30))
  shadowRGeometry = new THREE.ExtrudeGeometry(shadowRShape, extrudeSettings)
  shadowR = new THREE.Mesh(shadowRGeometry, shadowMaterial)
  gameLogic.scene.add(shadowR)

  gameLogic.scene.remove(philtrumShadow)
  philtrumShape = new THREE.Shape(philtrumCurve.getSpacedPoints(30))
  philtrumGeometry = new THREE.ExtrudeGeometry(philtrumShape, extrudeSettings)
  philtrumShadow = new THREE.Mesh(philtrumGeometry, shadowMaterial)
  gameLogic.scene.add(philtrumShadow)

  gameLogic.scene.remove(chinShadow)
  chinShape = new THREE.Shape(chinCurve.getSpacedPoints(30))
  chinGeometry = new THREE.ExtrudeGeometry(chinShape, extrudeSettings)
  chinShadow = new THREE.Mesh(chinGeometry, shadowMaterial)
  gameLogic.scene.add(chinShadow)

  gameLogic.scene.add(eyelidL)
  gameLogic.scene.add(eyelidR)

  gameLogic.scene.remove(cheekL)
  cheekLShape = new THREE.Shape(cheekLCurve.getSpacedPoints(30))
  cheekLGeometry = new THREE.ExtrudeGeometry(cheekLShape, extrudeSettings)
  cheekL = new THREE.Mesh(cheekLGeometry, shadowMaterial)
  gameLogic.scene.add(cheekL)

  gameLogic.scene.remove(cheekR)
  cheekRShape = new THREE.Shape(cheekRCurve.getSpacedPoints(30))
  cheekRGeometry = new THREE.ExtrudeGeometry(cheekRShape, extrudeSettings)
  cheekR = new THREE.Mesh(cheekRGeometry, shadowMaterial)
  gameLogic.scene.add(cheekR)

  gameLogic.scene.add(leftPupil)
  gameLogic.scene.add(rightPupil)

  gameLogic.scene.remove(eyelashL)
  eyelashLShape = new THREE.Shape(eyelashLCurve.getSpacedPoints(30))
  eyelashLGeometry = new THREE.ExtrudeGeometry(eyelashLShape, lashExtrude)
  eyelashL = new THREE.Mesh(eyelashLGeometry, lashMaterial)
  gameLogic.scene.add(eyelashL)

  gameLogic.scene.remove(eyelashR)
  eyelashRShape = new THREE.Shape(eyelashRCurve.getSpacedPoints(30))
  eyelashRGeometry = new THREE.ExtrudeGeometry(eyelashRShape, lashExtrude)
  eyelashR = new THREE.Mesh(eyelashRGeometry, lashMaterial)
  gameLogic.scene.add(eyelashR)

  gameLogic.scene.remove(eyebagL)
  eyebagLShape = new THREE.Shape(eyebagLCurve.getSpacedPoints(30))
  eyebagLGeometry = new THREE.ExtrudeGeometry(eyebagLShape, extrudeSettings)
  eyebagL = new THREE.Mesh(eyebagLGeometry, shadowMaterial)
  gameLogic.scene.add(eyebagL)

  gameLogic.scene.remove(eyebagR)
  eyebagRShape = new THREE.Shape(eyebagRCurve.getSpacedPoints(30))
  eyebagRGeometry = new THREE.ExtrudeGeometry(eyebagRShape, extrudeSettings)
  eyebagR = new THREE.Mesh(eyebagRGeometry, shadowMaterial)
  gameLogic.scene.add(eyebagR)

  // HIGHLIGHTS

  gameLogic.scene.remove(noseHigh)
  noseHighShape = new THREE.Shape(noseHighCurve.getSpacedPoints(30))
  noseHighGeometry = new THREE.ExtrudeGeometry(noseHighShape, noseHExtrude)
  noseHigh = new THREE.Mesh(noseHighGeometry, highlightMaterial)
  gameLogic.scene.add(noseHigh)

  gameLogic.scene.remove(chinHighlight)
  chinHShape = new THREE.Shape(chinHCurve.getSpacedPoints(30))
  chinHGeometry = new THREE.ExtrudeGeometry(chinHShape, extrudeSettingsH)
  chinHighlight = new THREE.Mesh(chinHGeometry, highlightMaterial)
  gameLogic.scene.add(chinHighlight)

  gameLogic.scene.remove(cheekRHighlight)
  cheekHRShape = new THREE.Shape(cheekHRCurve.getSpacedPoints(30))
  cheekHRGeometry = new THREE.ExtrudeGeometry(cheekHRShape, extrudeSettingsH)
  cheekRHighlight = new THREE.Mesh(cheekHRGeometry, highlightMaterial)
  gameLogic.scene.add(cheekRHighlight)

  gameLogic.scene.remove(cheekLHighlight)
  cheekHLShape = new THREE.Shape(cheekHLCurve.getSpacedPoints(30))
  cheekHLGeometry = new THREE.ExtrudeGeometry(cheekHLShape, extrudeSettingsH)
  cheekLHighlight = new THREE.Mesh(cheekHLGeometry, highlightMaterial)
  gameLogic.scene.add(cheekLHighlight)

  gameLogic.scene.add(foreheadHighlight)
}

export { update, shadowMaterial, cheekR1, cheekR2, cheekL1, cheekL2, highlightMaterial,
  cheekHR1, cheekHR3, cheekHL1, cheekHL3, cheekL3, cheekR3, eyebagL1, eyebagL2, eyebagL3, eyebagL4,
  eyebagR1, eyebagR2, eyebagR3, eyebagR4, eyebagL5, eyebagL6, eyebagR5, eyebagR6 }
