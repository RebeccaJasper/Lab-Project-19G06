'use strict'

$(document).ready(() => {
  loadSubmissionInfo() // This function also displays the submission info when it has been loaded
})

let loadSubmissionInfo = function () {
  // Make an AJAX request to retrieve the submission information by the submission ID
  // Need to check the AJAX request made by this function
//   let submissionID = JSON.parse(window.sessionStorage.getItem('submissionID'))
//   $.ajax({
//     url: '/api/submit',
//     method: 'POST',
//     contentType: 'application/json',
//     data: JSON.stringify(submissionID),
//     success: function (submission) {
//       displaySubmissionInfo(submission)
//     }
//   })

  let submission = { id: '12345',
    name: 'name',
    surname: 'surname',
    gender: 'male',
    race: 'black',
    photo: 'static/img/identikit.jpg' }

  displaySubmissionInfo(submission)
}

let displaySubmissionInfo = function (submission) {
  let submissionInfoArea = $('#submission-info-area')
  let submissionID = document.createElement('div')
  submissionID.innerHTML = '<b>Submission ID: </b>' + submission.id
  submissionInfoArea.append(submissionID)

  let submissionNames = document.createElement('div')
  submissionNames.innerHTML = '<b>Full Name : </b>' + submission.name + ' ' + submission.surname
  submissionInfoArea.append(submissionNames)

  let submissionGender = document.createElement('div')
  submissionGender.innerHTML = '<b>Gender: </b>' + submission.gender
  submissionInfoArea.append(submissionGender)

  let submissionRace = document.createElement('div')
  submissionRace.innerHTML = '<b>Race: </b>' + submission.race
  submissionInfoArea.append(submissionRace)

  let photo = document.createElement('img')
  photo.id = 'identikit-photo'
  photo.src = submission.photo
  submissionInfoArea.append(photo)

  // let button = document.createElement('button')
  // button.className = 'match-button-btn'
  // button.innerHTML = 'FIND ALL MATCHES'
  // submissionInfoArea.append(button)
}

let findMatches = function () {
  console.log('find matches')
}
