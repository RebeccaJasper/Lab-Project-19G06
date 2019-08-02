$(document).ready(() => {

    $.ajax({
      url: '/api/photo',
      method: 'POST',
      contentType: 'application/json',
      success: function (res) {
        console.log(res)
      }
    })
})