import * as generateFace from './face.js'
import * as eyes from './eyes.js'
import * as mouth from './mouth.js'
import * as nose from './nose.js'
import * as brows from './brows.js'
import * as shadows from './shadows.js'
import * as gameLogic from './gameLogic.js'

var UserControls = function () {
  this.upperWidth = 0
  this.midWidth = 0
  this.chinWidth = 0
  this.skinColour = generateFace.skinColour
  this.eyeWidth = 0
  this.eyeHeight = 0
  this.eyeColour = eyes.irisColour
  this.mouthWidth = 0
  this.lipCurve = 0
  this.lipThickness = 0
  this.mouthCorners = 0
  this.noseWidth = 0
  this.bridgeWidth = 0
  this.nosePeak = 0
  this.browPeak = 0
  this.browOuterX = 0
  this.browOuterY = 0
  this.browInnerX = 0
  this.browInnerY = 0
  this.browColour = brows.browColour
}

window.onload = function () {
  var params = new UserControls()
  var gui = new dat.GUI()

  var faceGUI = gui.addFolder('Face')

  faceGUI.add(params, 'upperWidth', -15, 15).name('Upper Face Width').onChange(function () {
    gameLogic.animate()
    let value = params.upperWidth
    generateFace.zero.x = -177 - value
    generateFace.sixteen.x = 177 + value
    shadows.cheekR1.x = 140 + value
    shadows.cheekR2.x = 150 + value
    shadows.cheekR3.x = 162 + value
    shadows.cheekL1.x = -140 - value
    shadows.cheekL2.x = -150 - value
    shadows.cheekL3.x = -162 - value
    shadows.cheekHR1.x = 140 + value
    shadows.cheekHR3.x = 124 + value
    shadows.cheekHL1.x = -140 - value
    shadows.cheekHL3.x = -124 - value
    gameLogic.cancelAnimate()
  })

  faceGUI.add(params, 'midWidth', -15, 15).name('Mid-Face Width').onChange(function () {
    gameLogic.animate()
    let value = params.midWidth
    generateFace.four.x = -147 - value
    generateFace.twelve.x = 147 + value
    shadows.cheekR1.x = 140 + value
    shadows.cheekL1.x = -140 - value
    shadows.cheekL2.x = -150 - value
    shadows.cheekR2.x = 150 + value
    gameLogic.cancelAnimate()
  })

  faceGUI.add(params, 'chinWidth', -15, 15).name('Chin Width').onChange(function () {
    gameLogic.animate()
    let value = params.chinWidth
    generateFace.six.x = -88 - value
    generateFace.ten.x = 88 + value
    generateFace.seven.x = -46 - value
    generateFace.nine.x = 46 + value
    shadows.cheekR1.x = 140 + value
    shadows.cheekL1.x = -140 - value
    shadows.cheekL2.x = -150 - value
    shadows.cheekR2.x = 150 + value
    gameLogic.cancelAnimate()
  })

  faceGUI.addColor(params, 'skinColour').name('Skin Tone').onChange(function () {
    gameLogic.animate()
    generateFace.material.color.setHex(generateFace.dec2hex(params.skinColour))
    nose.material.color.setHex(generateFace.dec2hex(params.skinColour))
    shadows.shadowMaterial.color.setHex((generateFace.dec2hex(params.skinColour) & 0xfefefe) >> 1)
    var highlight = new THREE.Color(params.skinColour)
    shadows.highlightMaterial.color.set(highlight.offsetHSL(0, 0, 0.15))
    var red = new THREE.Color(0x33001a)
    var lips = new THREE.Color(params.skinColour)
    lips.add(red)
    mouth.material.color.set(lips)
    gameLogic.cancelAnimate()
  })

  var eyeGUI = gui.addFolder('Eyes')

  eyeGUI.add(params, 'eyeWidth', -15, 15).name('Eye Width').onChange(function () {
    gameLogic.animate()
    let value = params.eyeWidth
    eyes.thirtySix.x = -113 - value
    eyes.thirtyNine.x = -49 + value
    eyes.fortyTwo.x = 49 - value
    eyes.fortyFive.x = 113 + value
    gameLogic.cancelAnimate()
  })

  eyeGUI.add(params, 'eyeHeight', -15, 15).name('Eye Height').onChange(function () {
    gameLogic.animate()
    let value = params.eyeHeight
    eyes.thirtySeven.y = 150 + value
    eyes.thirtyEight.y = 150 + value
    eyes.fortyThree.y = 150 + value
    eyes.fortyFour.y = 150 + value
    eyes.forty.y = 131 - value
    eyes.fortyOne.y = 131 - value
    eyes.fortySix.y = 131 - value
    eyes.fortySeven.y = 131 - value
    shadows.eyebagL1.y = 128 - value
    shadows.eyebagR1.y = 128 - value
    shadows.eyebagL2.y = 120 - value
    shadows.eyebagR2.y = 120 - value
    shadows.eyebagL3.y = 120 - value
    shadows.eyebagR3.y = 120 - value
    shadows.eyebagL4.y = 122 - value
    shadows.eyebagR4.y = 122 - value
    shadows.eyebagL5.y = 107 - value
    shadows.eyebagR5.y = 107 - value
    shadows.eyebagL6.y = 110 - value
    shadows.eyebagR6.y = 110 - value
    gameLogic.cancelAnimate()
  })

  eyeGUI.addColor(params, 'eyeColour').name('Eye Colour').onChange(function () {
    gameLogic.animate()
    eyes.circleMaterial.color.setHex(generateFace.dec2hex(params.eyeColour))
    gameLogic.cancelAnimate()
  })

  var mouthGUI = gui.addFolder('Mouth')

  mouthGUI.add(params, 'mouthWidth', -15, 15).name('Mouth Width').onChange(function () {
    gameLogic.animate()
    let value = params.mouthWidth
    mouth.fortyEight.x = -64 - value
    mouth.fiftyFour.x = 64 + value
    mouth.fortyNine.x = -38 - value
    mouth.fiftyThree.x = 38 + value
    mouth.sixty.x = -53 - value
    mouth.sixtyFour.x = 53 + value
    gameLogic.cancelAnimate()
  })

  mouthGUI.add(params, 'lipCurve', -10, 5).name('Upper Lip Shape').onChange(function () {
    gameLogic.animate()
    let value = params.lipCurve
    mouth.fifty.y = 5 + value
    mouth.fiftyTwo.y = 5 + value
    gameLogic.cancelAnimate()
  })

  mouthGUI.add(params, 'lipThickness', -5, 5).name('Lip Thickness').onChange(function () {
    gameLogic.animate()
    let value = params.lipThickness
    mouth.fortyNine.y = -6 + value
    mouth.fiftyOne.y = value
    mouth.fiftyThree.y = -6 + value

    mouth.fiftyFive.y = -32 - value
    mouth.fiftySix.y = -38 - value
    mouth.fiftySeven.y = -39 - value
    mouth.fiftyEight.y = -38 - value
    mouth.fiftyNine.y = -32 - value
    gameLogic.cancelAnimate()
  })

  mouthGUI.add(params, 'mouthCorners', -5, 5).name('Mouth Corners').onChange(function () {
    gameLogic.animate()
    let value = params.mouthCorners
    mouth.fiftyFour.y = -20 + value
    mouth.fortyEight.y = -20 + value
    gameLogic.cancelAnimate()
  })

  var noseGUI = gui.addFolder('Nose')

  noseGUI.add(params, 'noseWidth', -10, 10).name('Nose Width').onChange(function () {
    gameLogic.animate()
    let value = params.noseWidth
    nose.thirtyOne.x = -33 - value
    nose.thirtyFive.x = 33 + value
    gameLogic.cancelAnimate()
  })

  noseGUI.add(params, 'bridgeWidth', -10, 10).name('Bridge Width').onChange(function () {
    gameLogic.animate()
    let value = params.bridgeWidth
    nose.twentySevenL.x = -10 - value
    nose.twentySevenR.x = 10 + value
    nose.twentyEightL.x = -10 - value
    nose.twentyEightR.x = 10 + value
    nose.twentyNineL.x = -10 - value
    nose.twentyNineR.x = 10 + value
    nose.thirtyL.x = -15 - value
    nose.thirtyR.x = 15 + value
    gameLogic.cancelAnimate()
  })

  noseGUI.add(params, 'nosePeak', -5, 10).name('Nose Peak').onChange(function () {
    gameLogic.animate()
    let value = params.nosePeak
    nose.thirtyThree.y = 35 - value
    gameLogic.cancelAnimate()
  })

  var browsGUI = gui.addFolder('Eyebrow Shape')

  browsGUI.add(params, 'browPeak', -10, 10).name('Brow Peak').onChange(function () {
    gameLogic.animate()
    let value = params.browPeak
    brows.nineteen.y = 203 + value
    brows.twentyFour.y = 203 + value
    gameLogic.cancelAnimate()
  })

  browsGUI.add(params, 'browOuterX', -10, 0).name('Outer Horizontal').onChange(function () {
    gameLogic.animate()
    let value = params.browOuterX
    brows.seventeen.x = -152 - value
    brows.twentySix.x = 152 + value
    gameLogic.cancelAnimate()
  })

  browsGUI.add(params, 'browOuterY', -7, 15).name('Outer Vertical').onChange(function () {
    gameLogic.animate()
    let value = params.browOuterY
    brows.seventeen.y = 169 + value
    brows.twentySix.y = 169 + value
    gameLogic.cancelAnimate()
  })

  browsGUI.add(params, 'browInnerX', -10, 10).name('Inner Horizontal').onChange(function () {
    gameLogic.animate()
    let value = params.browInnerX
    brows.twentyOne.x = -28 - value
    brows.twentyTwo.x = 28 + value
    gameLogic.cancelAnimate()
  })

  browsGUI.add(params, 'browInnerY', -5, 5).name('Inner Vertical').onChange(function () {
    gameLogic.animate()
    let value = params.browInnerY
    brows.twentyOne.y = 192 + value
    brows.twentyTwo.y = 192 + value
    gameLogic.cancelAnimate()
  })

  browsGUI.addColor(params, 'browColour').name('Eyebrow Colour').onChange(function () {
    gameLogic.animate()
    brows.material.color.setHex(generateFace.dec2hex(params.browColour))
    gameLogic.cancelAnimate()
  })
}

let facialMarkers =
[
  generateFace.zero.x, generateFace.zero.y,
  generateFace.four.x, generateFace.four.y,
  generateFace.six.x, generateFace.six.y,
  generateFace.ten.x, generateFace.ten.y,
  generateFace.twelve.x, generateFace.twelve.y,
  generateFace.sixteen.x, generateFace.sixteen.y,

  brows.seventeen.x, brows.seventeen.y,
  brows.eighteen.x, brows.eighteen.y,
  brows.nineteen.x, brows.nineteen.y,
  brows.twenty.x, brows.twenty.y,
  brows.twentyOne.x, brows.twentyOne.y,
  brows.twentyTwo.x, brows.twentyTwo.y,
  brows.twentyThree.x, brows.twentyThree.y,
  brows.twentyFour.x, brows.twentyFour.y,
  brows.twentyFive.x, brows.twentyFive.y,
  brows.twentySix.x, brows.twentySix.y,

  nose.thirtyOne.x, nose.thirtyOne.y,
  nose.thirtyTwo.x, nose.thirtyTwo.y,
  nose.thirtyThree.x, nose.thirtyThree.y,
  nose.thirtyFour.x, nose.thirtyFour.y,
  nose.thirtyFive.x, nose.thirtyFive.y,

  eyes.thirtySix.x, eyes.thirtySix.y,
  eyes.thirtySeven.x, eyes.thirtySeven.y,
  eyes.thirtyEight.x, eyes.thirtyEight.y,
  eyes.thirtyNine.x, eyes.thirtyNine.y,
  eyes.forty.x, eyes.forty.y,
  eyes.fortyOne.x, eyes.fortyOne.y,
  eyes.fortyTwo.x, eyes.fortyTwo.y,
  eyes.fortyThree.x, eyes.fortyThree.y,
  eyes.fortyFour.x, eyes.fortyFour.y,
  eyes.fortyFive.x, eyes.fortyFive.y,
  eyes.fortySix.x, eyes.fortySix.y,
  eyes.fortySeven.x, eyes.fortySeven.y,

  mouth.fortyEight.x, mouth.fortyEight.y,
  mouth.fortyNine.x, mouth.fortyNine.y,
  mouth.fifty.x, mouth.fifty.y,
  mouth.fiftyOne.x, mouth.fiftyOne.y,
  mouth.fiftyTwo.x, mouth.fiftyTwo.y,
  mouth.fiftyThree.x, mouth.fiftyThree.y,
  mouth.fiftyFour.x, mouth.fiftyFour.y,
  mouth.fiftyFive.x, mouth.fiftyFive.y,
  mouth.fiftySix.x, mouth.fiftySix.y,
  mouth.fiftySeven.x, mouth.fiftySeven.y,
  mouth.fiftyEight.x, mouth.fiftyEight.y,
  mouth.fiftyNine.x, mouth.fiftyNine.y,
  mouth.sixty.x, mouth.sixty.y,
  mouth.sixtyOne.x, mouth.sixtyOne.y,
  mouth.sixtyTwo.x, mouth.sixtyTwo.y,
  mouth.sixtyThree.x, mouth.sixtyThree.y,
  mouth.sixtyFour.x, mouth.sixtyFour.y,
  mouth.sixtyFive.x, mouth.sixtyFive.y,
  mouth.sixtySix.x, mouth.sixtySix.y,
  mouth.sixtySeven.x, mouth.sixtySeven.y
]

export { facialMarkers }
