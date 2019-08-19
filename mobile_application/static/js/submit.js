import * as markers from './GUI.js'
import * as gameWindow from './gameLogic.js'

$(document).ready(() => {
  $('.submit-btn').click(() => {
    $('.submit-btn').attr('disabled', true)
    let statement = JSON.parse(window.sessionStorage.getItem('statement'))
    let person_id = JSON.parse(window.sessionStorage.getItem('photo_id'))

    // Format string
    let identikit = gameWindow.saveAsImage()
    identikit = identikit.substring(identikit.indexOf(',') + 1, identikit.length)
    let colours = gameWindow.saveColours()

    let submission = {
      'firstName': statement.firstName,
      'surname': statement.surname,
      'gender': statement.gender,
      'race': statement.race,
      'feature_vector': markers.facialMarkers.toString(),
      'person_id': person_id,
      'identikit': identikit,
      'skinColour': colours.skinColour,
      'eyeColour': colours.eyeColour
    }

    $.ajax({
      url: '/api/submit',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(submission),
      success: function (res) {
        console.log('statement and identikit submitted')
        console.log(submission)
        window.location = '/complete'
      }
    })
  })
})
