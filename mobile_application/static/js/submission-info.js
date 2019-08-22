'use strict'

$(document).ready(() => {
  loadSubmissionInfo() // This function also displays the submission info when it has been loaded
})

let loadSubmissionInfo = function () {
  // REFINE AJAX REQUEST WHEN LINKING TO DATABASE
  // Make an AJAX request to retrieve the submission information by the submission ID
  // let submissionID = JSON.parse(window.sessionStorage.getItem('submissionID'))
  // $.ajax({
  //   url: '/api/submit',
  //   method: 'POST',
  //   contentType: 'application/json',
  //   data: JSON.stringify(submissionID),
  //   success: function (submission) {
  //     displaySubmissionInfo(submission)
  //   }
  // })

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
}

let findMatches = function () {
  // REFINE AJAX REQUEST WHEN LINKING TO DATABASE
  // Make an AJAX request to retrieve the persons matching the submission ID
  // let submissionID = JSON.parse(window.sessionStorage.getItem('submissionID'))
  // $.ajax({
  //   url: '/api/submit',
  //   method: 'POST',
  //   contentType: 'application/json',
  //   data: JSON.stringify(submissionID),
  //   success: function (persons) {
  //     displayMatches(persons)
  //   }
  // })

  let persons = [
    { id: '12345',
      name: 'name',
      surname: 'surname',
      gender: 'male',
      race: 'black',
      photo: 'static/img/1.jpg' },
    { id: '54321',
      name: 'another name',
      surname: 'another surname',
      gender: 'female',
      race: 'white',
      photo: 'static/img/1.jpg' },
    { id: '11111',
      name: 'another name',
      surname: 'another surname',
      gender: 'female',
      race: 'white',
      photo: 'static/img/1.jpg' }
  ]

  displayMatches(persons)

  // change the page display

  $('.match-button-btn').attr('hidden', true)

  let submissionInfo = document.getElementById('right')
  submissionInfo.style.visibility = 'visible'
  submissionInfo.className = 'move-right'

  let matchesInfo = document.getElementById('left')
  matchesInfo.className = 'move-left'
}

let displayMatches = function (persons) {
  persons.forEach(person => {
    displayPersonInfo(person)
  })
}

let displayPersonInfo = function (person) {
  let matchesInfoArea = $('#content')

  let personDiv = document.createElement('div')
  personDiv.className = 'person'

  let personID = document.createElement('div')
  personID.innerHTML = '<b>Person ID: </b>' + person.id
  personDiv.append(personID)

  let personNames = document.createElement('div')
  personNames.innerHTML = '<b>Full Name : </b>' + person.name + ' ' + person.surname
  personDiv.append(personNames)

  let personGender = document.createElement('div')
  personGender.innerHTML = '<b>Gender: </b>' + person.gender
  personDiv.append(personGender)

  let personRace = document.createElement('div')
  personRace.innerHTML = '<b>Race: </b>' + person.race
  personDiv.append(personRace)

  let photo = document.createElement('img')
  photo.id = 'person-photo'
  photo.src = person.photo
  personDiv.append(photo)

  matchesInfoArea.append(personDiv)
}

$(document).on('click', '#back-button', function () {
  window.location = '/submissions'
})
