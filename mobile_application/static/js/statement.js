var submission = {
  nameKnown: 0.5
}

$(document).ready(() => {
// Object for holding submission information

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
      submission.gender = 0.25
    }
    if ($('#gender :selected').val() === 'female') {
      submission.gender = 0.5
    }
    if ($('#gender :selected').val() === 'male') {
      submission.gender = 0.75
    }
    if ($('#gender :selected').val() === 'unknown') {
      submission.gender = 1
    }

    if ($('#race :selected').val() === 'unknown') {
      submission.race = 0.16
    }

    if ($('#race :selected').val() === 'white') {
      submission.race = 0.32
      console.log(submission.race)
    }
    if ($('#race :selected').val() === 'asian') {
      submission.race = 0.48
    }
    if ($('#race :selected').val() === 'indian') {
      submission.race = 0.64
    }
    if ($('#race :selected').val() === 'coloured') {
      submission.race = 0.8
    }
    if ($('#race :selected').val() === 'black') {
      submission.race = 0.96
    }

    // $.ajax({
    //   url: '/api/submit',
    //   method: 'POST',
    //   contentType: 'application/json',
    //   data: JSON.stringify(submission),
    //   success: function (res) {
    //     window.location = '/identi-kreate'
    //   }
    // })
  })
})

export { submission }
