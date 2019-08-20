$('.loader').fadeIn('slow')

$(document).ready(() => {
  $('.loader').fadeOut('slow')

  // Object for holding submission information
  var submission = {}
  window.sessionStorage.setItem('prevRoute', window.location)
  // Toggle all further details based on whether the person is known or not
  $('#known-before-yes').on('change', () => {
    if ($('#known-before-yes').is(':checked')) {
      $('.details').css('display', 'block')
    }
    $('#submit-btn').css('display', 'block')
  })

  $('#known-before-no').click(() => {
    if ($('#known-before-no').is(':checked')) {
      $('.details').css('display', 'none')
    }
    $('#submit-btn').css('display', 'block')
  })

  // Toggle the input fields for person's name
  $('#person-name-yes').on('change', () => {
    if ($('#person-name-yes').is(':checked')) {
      $('#name-is-known').css('display', 'block')
    }
  })

  $('#person-name-no').click(() => {
    if ($('#person-name-no').is(':checked')) {
      $('#name-is-known').css('display', 'none')
    }
  })

  // Submission
  $('#submit-btn').click(() => {
    if ($('#person-name-yes').is(':checked')) {
      submission.firstName = $('#firstname').val()
      submission.surname = $('#surname').val()
    } else {
      submission.firstName = ''
      submission.surname = ''
    }

    if ($('#gender :selected').val() === 'other') {
      submission.gender = 'Other'
    }
    if ($('#gender :selected').val() === 'female') {
      submission.gender = 'Female'
    }
    if ($('#gender :selected').val() === 'male') {
      submission.gender = 'Male'
    }
    if ($('#gender :selected').val() === 'unknown') {
      submission.gender = 'Unknown'
    }

    if ($('#race :selected').val() === 'unknown') {
      submission.race = 'Unknown'
    }

    if ($('#race :selected').val() === 'white') {
      submission.race = 'White'
      console.log(submission.race)
    }
    if ($('#race :selected').val() === 'asian') {
      submission.race = 'Indian and Asian'
    }
    if ($('#race :selected').val() === 'indian') {
      submission.race = 'Indian and Asian'
    }
    if ($('#race :selected').val() === 'coloured') {
      submission.race = 'Coloured'
    }
    if ($('#race :selected').val() === 'black') {
      submission.race = 'Black'
    }

    window.sessionStorage.setItem('statement', JSON.stringify(submission))

    window.location = '/identi-kreate'
  })
})
