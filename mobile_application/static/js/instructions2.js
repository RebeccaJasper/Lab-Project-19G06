$('.loader').fadeIn('slow')

$(document).ready(() => {
  $('.loader').fadeOut('slow')

  if (typeof window.sessionStorage.getItem('photo_id') === 'undefined' ||
        typeof window.sessionStorage.getItem('photo_id') === 'object') {
    $('.continue-btn').click(() => {
      window.location = '/photo'
    })
  } else {
    window.location = window.sessionStorage.getItem('prevRoute')
  }
})
