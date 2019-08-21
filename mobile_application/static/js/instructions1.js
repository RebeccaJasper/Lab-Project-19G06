$('.loader').fadeIn('slow')

$(document).ready(() => {
  $('.loader').fadeOut('slow')

  if (typeof window.sessionStorage.getItem('photo_id') === 'undefined' ||
        typeof window.sessionStorage.getItem('photo_id') === 'object') {
    $('.continue-btn').click(() => {
      window.location = '/instructions2'
    })
  } else {
    window.location = window.sessionStorage.getItem('prevRoute')
  }
})
