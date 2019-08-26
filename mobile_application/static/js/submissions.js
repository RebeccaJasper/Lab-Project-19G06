'use strict'

$('.loader').fadeIn('slow')

$(document).ready(() => {
  $('.loader').fadeOut('slow')
  loadSubmissions() // This function also displays the submissions when they have been loaded
})

let loadSubmissions = function () {
  // Make an AJAX request to retrieve the past 10 submissions by their submission IDs (date time stamp)
  // Need to check the AJAX request made by this function
  $.ajax({
    url: 'api/submissions',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(),
    success: function (res) {
      console.log(typeof JSON.parse(res))
      displaySubmissions(JSON.parse(res))
    }
  })
//  let submissions = [{ time: '22/08/2019', id: '70', statement: 'statement 1', photo: 'photo 1' },
//    { time: '20/08/2019', id: '54321', statement: 'statement 2', photo: 'photo 2' },
//    { time: '18/08/2019', id: '32154', statement: 'statement 3', photo: 'photo 3' }]
//  displaySubmissions(submissions)
}

let displaySubmissions = function (submissions) {
  $('#submissionsTable').empty()
  submissions.forEach((submission) => {
    appendSubmissionToTable(submission)
  })
}

let appendSubmissionToTable = function (submission) {
  let submissionsTable = $('#submissionsTable')
  let newRow = document.createElement('tr')

  let submissionTime = document.createElement('td')
  submissionTime.innerHTML = submission.time
  newRow.append(submissionTime)

  // Add a button to each submssion ID that allows the user to
  // view more information about the submission
  let viewButton = document.createElement('button')
  viewButton.id = 'viewButton'
  viewButton.classList.add('btn', 'btn-sm', 'btn-secondary')
  viewButton.innerHTML = submission.id
  let viewButtonCell = document.createElement('td')
  viewButtonCell.appendChild(viewButton)
  newRow.appendChild(viewButtonCell)

  newRow.id = submission.id
  submissionsTable.append(newRow)
}

$(document).on('click', '#viewButton', function (e) {
  let submissionID = $(this).parents('tr')[0].id
  console.log(submissionID)
  //  window.sessionStorage.setItem('submissionID', submissionID)

  window.location = '/submission-info/'.concat(submissionID)
})
