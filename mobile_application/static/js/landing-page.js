if ($(window).width() < 400) {
  $('.brand-name').css('font-size', '5px')
}

$('.loader').fadeIn('slow')

$(document).ready(() => {
  $('.loader').fadeOut('slow')

  // window.location = window.sessionStorage.getItem('prevRoute')
})

let identiKreate = function () {
  window.location = '/statement'
}

let identiMatch = function () {
  window.location = '/submissions'
}
