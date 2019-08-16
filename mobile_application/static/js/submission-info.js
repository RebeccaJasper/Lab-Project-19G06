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
  let submission = { id: '12345', statement: 'statement 1', photo: 'photo 1' }
  displaySubmissionInfo(submission)
}

let displaySubmissionInfo = function (submission) {
  let submissionID = document.createElement('div')
  submissionID.innerHTML = submission.id
  let submissionInfoArea = $('#submission-info-area')
  submissionInfoArea.append(submissionID)

//   <div id='submission-id'></div>
//   <div id='submission-name-and-surname'></div>
//   <div id='submission-gender'></div>
//   <div id='submission-race'></div>
}

$(document).on('click', '#match-button-btn', function (e) {

})
