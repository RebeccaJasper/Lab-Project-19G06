import * as statement from './statement.js'
import * as markers from './GUI.js'

$(document).ready(() => {
  $('.submit-btn').click(() => {
    console.log('submit button')

    $.ajax({
      url: '/api/submit',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(statement.submission, markers.facialMarkers),
      success: function (res) {
        console.log(statement.submission, markers.facialMarkers)
      }
    })
  })
})
