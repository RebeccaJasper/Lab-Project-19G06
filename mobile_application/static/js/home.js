$(document).ready(() => {
    $('#home-page-btn').click(() => {
        window.location = "/explanation"
    })

    if ($(window).width() < 400){
        console.log('Im on a phone')
    }

})