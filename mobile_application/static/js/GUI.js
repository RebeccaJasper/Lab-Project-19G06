import * as generateFace from './generateFace.js'
import * as eyes from './eyes.js'
import * as mouth from './mouth.js'

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
}

window.onload = function () {
  var params = new UserControls()
  var gui = new dat.GUI()

  var faceGUI = gui.addFolder('Face')

  faceGUI.add(params, 'upperWidth', -30, 30).name('Upper Face Width').onChange(function () {
    let value = params.upperWidth
    generateFace.zero.x = -177 - value
    generateFace.sixteen.x = 177 + value
  })

  faceGUI.add(params, 'midWidth', -50, 50).name('Mid-Face Width').onChange(function () {
    let value = params.midWidth
    generateFace.four.x = -147 - value
    generateFace.twelve.x = 147 + value
  })

  faceGUI.add(params, 'chinWidth', -50, 50).name('Chin Width').onChange(function () {
    let value = params.chinWidth
    generateFace.six.x = -88 - value
    generateFace.ten.x = 88 + value
    generateFace.seven.x = -46 - value
    generateFace.nine.x = 46 + value
  })

  faceGUI.addColor(params, 'skinColour').name('Skin Tone').onChange(function () {
    generateFace.material.color.setHex(generateFace.dec2hex(params.skinColour))
  })

  var eyeGUI = gui.addFolder('Eyes')

  eyeGUI.add(params, 'eyeWidth', -15, 15).name('Eye Width').onChange(function () {
    let value = params.eyeWidth
    eyes.thirtySix.x = -113 - value
    eyes.thirtyNine.x = -49 + value
    eyes.fortyTwo.x = 49 - value
    eyes.fortyFive.x = 113 + value
  })

  eyeGUI.add(params, 'eyeHeight', -15, 15).name('Eye Height').onChange(function () {
    let value = params.eyeHeight
    eyes.thirtySeven.y = 150 + value
    eyes.thirtyEight.y = 150 + value
    eyes.fortyThree.y = 150 + value
    eyes.fortyFour.y = 150 + value
    eyes.forty.y = 131 - value
    eyes.fortyOne.y = 131 - value
    eyes.fortySix.y = 131 - value
    eyes.fortySeven.y = 131 - value
  })

  eyeGUI.addColor(params, 'eyeColour').name('Eye Colour').onChange(function () {
    eyes.circleMaterial.color.setHex(generateFace.dec2hex(params.eyeColour))
  })

  var mouthGUI = gui.addFolder('Mouth')

  mouthGUI.add(params, 'mouthWidth', -15, 15).name('Mouth Width').onChange(function () {
    let value = params.mouthWidth
    mouth.fortyEight.x = -64 - value
    mouth.fiftyFour.x = 64 + value
    mouth.fortyNine.x = -38 - value
    mouth.fiftyThree.x = 38 + value
  })

  mouthGUI.add(params, 'lipCurve', -5, 5).name('Upper Lip Shape').onChange(function () {
    let value = params.lipCurve
    mouth.fifty.y = 5 + value
    mouth.fiftyTwo.y = 5 + value
  })
}
