if ($(window).width() < 400) {
  $('.brand-name').css('font-size', '5px')
}

$('.loader').fadeIn('slow')

$(document).ready(() => {
  $('.loader').fadeOut('slow')
})

let identiKreate = function () {
  window.location = '/statement'
}

let identiMatch = function () {
  window.location = '/submissions'
}
