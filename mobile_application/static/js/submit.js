import * as markers from './GUI.js'

$(document).ready(() => {
  $('.submit-btn').click(() => {
    let statement = window.sessionStorage.getItem('statement')

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
