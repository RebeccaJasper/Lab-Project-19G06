$(document).ready(() => {

    $.ajax({
        url: '/api/photo',
        method: 'POST',
        contentType: 'application/json',
        success: function (res) {
            $('#image-area').append("<img src='data:image/jpg;base64," + res.img_string + "'>")
            sessionStorage.setItem("photo_id", res.person_id)

            let VIEWING_DURATION = 9000

            setTimeout(() => {
                window.location = "/statement"
            }, VIEWING_DURATION)
        }
    })

})

//$(window).on('beforeunload', () => {
////  console.log('Tried to unload')
////  window.alert("Please stay on the site and view the image for the full 9 seconds")
////  window.location = "/photo"
//  return "Please stay on the site and view the image for the full 9 seconds";
//});

window.addEventListener("beforeunload", function(e) {
     e.preventDefault();
     e.returnValue = false;
     return "Please stay on the site and view the image for the full 9 seconds";
});