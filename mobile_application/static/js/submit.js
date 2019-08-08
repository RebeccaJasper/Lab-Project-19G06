import * as markers from './GUI.js'

$(document).ready(() => {
  $('.submit-btn').click(() => {
    let statement = window.sessionStorage.getItem('statement')

    html2canvas(document.body, { allowTaint: true, useCORS: true }).then(function (canvas) {
      var img = canvas.toDataURL('image/png')
      window.open(img)
    })

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
