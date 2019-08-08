import * as markers from './GUI.js'
// import * as game from './gameLogic.js'

$(document).ready(() => {
  $('.submit-btn').click(() => {
    let statement = window.sessionStorage.getItem('statement')
    // game.saveAsImage()

    $.ajax({
      url: '/api/submit',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(statement, markers.facialMarkers),
      success: function (res) {
        console.log('statement and identikit submitted')
        console.log(statement, markers.facialMarkers)
      }
    })
  })
})
