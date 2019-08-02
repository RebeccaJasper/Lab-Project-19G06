$(document).ready(() => {

    $.ajax({
      url: '/api/photo',
      method: 'POST',
      contentType: 'application/json',
      success: function (res) {
        $('#image-area').append("<img src='data:image/jpg;base64," + res.img_string + "'>")
      }
    })

    let VIEWING_DURATION = 5000
    setTimeout(function(){
      window.location = "/statement"
    }, VIEWING_DURATION);
    })