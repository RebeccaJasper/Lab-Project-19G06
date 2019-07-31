import * as generateFace from './generateFace.js'
import * as eyes from './eyes.js'

var UserControls = function () {
  this.skinColour = generateFace.skinColour
  // this.faceLength = 0
  this.upperWidth = 0
  this.midWidth = 0
  this.chinWidth = 0
  this.eyeWidth = 0
  this.eyeHeight = 0
  this.eyeColour = eyes.irisColour
}

window.onload = function () {
  var params = new UserControls()
  var gui = new dat.GUI()

  gui.addColor(params, 'skinColour').name('Skin Tone').onChange(function () {
    generateFace.material.color.setHex(generateFace.dec2hex(params.skinColour))
  })

  // gui.add(params, 'faceLength', -30, 30).name('Face Length').onChange(function () {
  //   let value = params.faceLength
  //   generateFace.FH0.y = 320 + value
  //   generateFace.FH1.y = 310 + value
  //   generateFace.FH2.y = 310 + value
  //   generateFace.six.y = -104 - value
  //   generateFace.seven.y = -122 - value
  //   generateFace.eight.y = -150 - value
  //   generateFace.nine.y = -122 - value
  //   generateFace.ten.y = -104 - value
  // })

  gui.add(params, 'upperWidth', -30, 30).name('Upper Face Width').onChange(function () {
    let value = params.upperWidth
    generateFace.zero.x = -177 - value
    generateFace.sixteen.x = 177 + value
  })

  gui.add(params, 'midWidth', -50, 50).name('Mid-Face Width').onChange(function () {
    let value = params.midWidth
    generateFace.four.x = -147 - value
    generateFace.twelve.x = 147 + value
  })

  gui.add(params, 'chinWidth', -50, 50).name('Chin Width').onChange(function () {
    let value = params.chinWidth
    generateFace.six.x = -88 - value
    generateFace.ten.x = 88 + value
    generateFace.seven.x = -46 - value
    generateFace.nine.x = 46 + value
  })

  gui.add(params, 'eyeWidth', -15, 15).name('Eye Width').onChange(function () {
    let value = params.eyeWidth
    eyes.thirtySix.x = -113 - value
    eyes.thirtyNine.x = -49 + value
    eyes.fortyTwo.x = 49 - value
    eyes.fortyFive.x = 113 + value
  })

  gui.add(params, 'eyeHeight', -15, 15).name('Eye Height').onChange(function () {
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

  gui.addColor(params, 'eyeColour').name('Eye Colour').onChange(function () {
    eyes.circleMaterial.color.setHex(generateFace.dec2hex(params.eyeColour))
  })
}
