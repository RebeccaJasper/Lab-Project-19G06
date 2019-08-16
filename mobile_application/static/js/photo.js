$(document).ready(() => {
  $.ajax({
    url: '/api/photo',
    method: 'POST',
    contentType: 'application/json',
    success: function (res) {
      $('#image-area').append("<img src='data:image/jpg;base64," + res.img_string + "'>")
      sessionStorage.setItem('photo_id', res.person_id)

      let VIEWING_DURATION = 15000

      setTimeout(() => {
        window.location = '/statement'
      }, VIEWING_DURATION)
    }
  })
})
