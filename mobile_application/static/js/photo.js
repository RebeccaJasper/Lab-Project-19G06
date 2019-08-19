var allowRouting = false

$(document).ready(() => {
    if (typeof window.sessionStorage.getItem('photo_id') == 'undefined' ||
        typeof window.sessionStorage.getItem('photo_id') == 'object') {
         $.ajax({
            url: '/api/photo',
            method: 'POST',
            contentType: 'application/json',
            success: function (res) {
                $('#image-area').append("<img src='data:image/jpg;base64," + res.img_string + "'>")
                sessionStorage.setItem("photo_id", res.person_id)

      let VIEWING_DURATION = 15000

                setTimeout(() => {
                    allow_routing = true
                    window.location = "/statement"
                }, VIEWING_DURATION)
            }
        })
    } else {
        window.location = window.sessionStorage.getItem('prevRoute')
    }
})

//$(window).on('beforeunload', () => {
////  console.log('Tried to unload')
////  window.alert("Please stay on the site and view the image for the full 9 seconds")
////  window.location = "/photo"
//  return "Please stay on the site and view the image for the full 9 seconds";
//});
//
//window.addEventListener("beforeunload", function(e) {
//    console.log(allowRouting)
//    if (allowRouting == false) {
//        console.log(allow_routing)
//        e.preventDefault();
//        e.returnValue = false;
//        return "Please stay on the site and view the image for the full 9 seconds";
//    }
//});