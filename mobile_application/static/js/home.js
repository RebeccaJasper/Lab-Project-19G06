if ($(window).width() < 400){
    $('.brand-name').css('font-size', '5px')
    console.log('Tries to run')
}

$(document).ready(() => {
    $('#home-page-btn').click(() => {
        window.location = "/explanation"
    })
})