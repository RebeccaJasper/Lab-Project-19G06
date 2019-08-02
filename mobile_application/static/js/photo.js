$(document).ready(() => {

    $.ajax({
      url: '/api/photo',
      method: 'POST',
      contentType: 'application/json',
      success: function (res) {
        $('#image-area').append("<img src='data:image/jpg;base64," + res.img_string + "'>")
      }
    })
})