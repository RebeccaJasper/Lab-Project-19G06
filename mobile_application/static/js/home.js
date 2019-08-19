if ($(window).width() < 400) {
  $('.brand-name').css('font-size', '5px')
  console.log('Tries to run')
}

$('.loader').fadeIn('slow')

$(document).ready(() => {
  $('.loader').fadeOut('slow')

  if (typeof window.sessionStorage.getItem('photo_id') === 'undefined' ||
        typeof window.sessionStorage.getItem('photo_id') === 'object') {
    $('#home-page-btn').click(() => {
      window.location = '/explanation'
    })
  } else {
    console.log(typeof window.sessionStorage.getItem('photo_id') === 'object')
    window.location = window.sessionStorage.getItem('prevRoute')
  }
})
