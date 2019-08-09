'use strict'

$(document).ready(() => {
  loadSubmissions() // This function also displays the submissions when they have been loaded
})

let loadSubmissions = function () {
  // Make an AJAX request to retrieve the past 10 submissions by their submission IDs (date time stamp)
  // Need to check the AJAX request made by this function
//   let statement = JSON.parse(window.sessionStorage.getItem('statement'))
//   $.ajax({
//     url: '/api/submit',
//     method: 'POST',
//     contentType: 'application/json',
//     data: JSON.stringify(statement),
//     success: function (res) {
//       displaySubmissions(res)
//     }
//   })
  let submissions = [{ id: '12345', statement: 'statement 1', photo: 'photo 1' },
    { id: '54321', statement: 'statement 2', photo: 'photo 2' },
    { id: '32154', statement: 'statement 3', photo: 'photo 3' }]
  displaySubmissions(submissions)
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

  let submissionID = document.createElement('td')
  submissionID.id = 'submissionText'
  submissionID.innerHTML = submission.id
  newRow.append(submissionID)

  // Add a button to each submssion ID that allows the user to
  // view more information about the submission
  let viewButton = document.createElement('button')
  viewButton.id = 'viewButton'
  viewButton.classList.add('btn', 'btn-sm', 'btn-secondary')
  viewButton.innerHTML = 'View'
  let viewButtonCell = document.createElement('td')
  viewButtonCell.appendChild(viewButton)
  newRow.appendChild(viewButtonCell)

  submissionsTable.append(newRow)
}
