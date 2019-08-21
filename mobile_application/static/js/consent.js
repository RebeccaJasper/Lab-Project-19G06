$('.loader').fadeIn('slow')

$(document).ready(() => {
  $('.loader').fadeOut('slow')

  $('#consent-checkbox').prop(':checked', false).removeAttr('checked')
  $('#consent-checkbox').removeAttr('checked')

  if (typeof window.sessionStorage.getItem('photo_id') === 'undefined' ||
        typeof window.sessionStorage.getItem('photo_id') === 'object') {
    $('#consent-checkbox').change(() => {
      if ($('#consent-checkbox').is(':checked')) {
        window.location = '/instructions1'
      }
    })
  } else {
    window.location = window.sessionStorage.getItem('prevRoute')
  }
})
