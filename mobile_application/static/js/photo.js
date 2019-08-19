var allowRouting = false

$('.loader').fadeIn('slow')

$(document).ready(() => {
  if (typeof window.sessionStorage.getItem('photo_id') === 'undefined' ||
        typeof window.sessionStorage.getItem('photo_id') === 'object') {
    $.ajax({
      url: '/api/photo',
      method: 'POST',
      contentType: 'application/json',
      success: function (res) {
        $('.loader').fadeOut('slow')

        $('#image-area').append("<img src='data:image/jpg;base64," + res.img_string + "'>")
        sessionStorage.setItem('photo_id', res.person_id)

        let VIEWING_DURATION = 15000

        setTimeout(() => {
          allow_routing = true
          window.location = '/statement'
        }, VIEWING_DURATION)
      }
    })
  } else {
    window.location = window.sessionStorage.getItem('prevRoute')
  }
})
