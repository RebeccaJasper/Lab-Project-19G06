import * as markers from './GUI.js'
import * as gameWindow from './gameLogic.js'



$(document).ready(() => {


    window.sessionStorage.setItem("prevRoute", window.location)
    $('.submit-btn').click(() => {
        let statement = JSON.parse(window.sessionStorage.getItem('statement'))
        let person_id = JSON.parse(window.sessionStorage.getItem('photo_id'))
        // Format string
        let identikit = gameWindow.saveAsImage()
        identikit = identikit.substring(identikit.indexOf(',') + 1, identikit.length)

        let submission = {
            "firstName" : statement.firstName,
            "surname" : statement.surname,
            "gender" : statement.gender,
            "race" : statement.race,
            "feature_vector" : markers.facialMarkers.toString(),
            "person_id": person_id,
            "identikit" : identikit
        }

        console.log(submission)
        $.ajax({
          url: '/api/submit',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(submission),
          success: function (res) {
            console.log('statement and identikit submitted')
            console.log(statement, markers.facialMarkers, identikit)
            sessionStorage.clear()
            window.location = '/complete'
          }
        })
    })
})
