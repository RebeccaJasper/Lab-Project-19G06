$(document).ready(() => {
// Object for holding submission information
  var submission = {
    nameKnown: 0.5
  }

  document.getElementById('gender').value = 'unknown'
  document.getElementById('race').value = 'unknown'

  // Toggle all further details based on whether the person is known or not
  $('#known-before-yes').on('change', () => {
    if ($('#known-before-yes').is(':checked')) {
      $('.details').css('display', 'block')
      submission.foreknown = 1
    }
    $('#submit-btn').css('display', 'block')
  })

  $('#known-before-no').click(() => {
    if ($('#known-before-no').is(':checked')) {
      $('.details').css('display', 'none')
      submission.foreknown = 0.5
    }
    $('#submit-btn').css('display', 'block')
  })

  // Toggle the input fields for person's name
  $('#person-name-yes').on('change', () => {
    if ($('#person-name-yes').is(':checked')) {
      $('#name-is-known').css('display', 'block')
      submission.nameKnown = 1
    }
  })

  $('#person-name-no').click(() => {
    if ($('#person-name-no').is(':checked')) {
      $('#name-is-known').css('display', 'none')
      submission.nameKnown = 0.5
    }
  })

  // Submission
  $('#submit-btn').click(() => {
    if ($('#person-name-yes').is(':checked')) {
      submission.firstName = $('#firstname').val()
      submission.surname = $('#surname').val()
    }

    if ($('#gender :selected').val() === 'other') {
      submission.gender = "Other"
    }
    if ($('#gender :selected').val() === 'female') {
      submission.gender = "Female"
    }
    if ($('#gender :selected').val() === 'male') {
      submission.gender = "Male"
    }
    if ($('#gender :selected').val() === 'unknown') {
      submission.gender = "Unknown"
    }

    if ($('#race :selected').val() === 'unknown') {
      submission.race = "Unknown"
    }

    if ($('#race :selected').val() === 'white') {
      submission.race = "White"
      console.log(submission.race)
    }
    if ($('#race :selected').val() === 'asian') {
      submission.race = "Indian and Asian"
    }
    if ($('#race :selected').val() === 'indian') {
      submission.race = "Indian and Asian"
    }
    if ($('#race :selected').val() === 'coloured') {
      submission.race = "Coloured"
    }
    if ($('#race :selected').val() === 'black') {
      submission.race = "Black"
    }

    $.ajax({
      url: '/api/submit',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(submission),
      success: function (res) {
        window.location = '/identi-kreate'
      }
    })
  })
})
