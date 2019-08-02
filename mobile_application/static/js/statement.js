$(document).ready(() => {

    // Toggle all further details based on whether the person is known or not
    $("#known-before-yes").on('change', () => {
        if ($("#known-before-yes").is(':checked')) {
            $('#details').css('display','block')
        }
    })
    $("#known-before-no").click(() => {
        if ($("#known-before-no").is(':checked')) {
            $('#details').css('display','none')
        }
    })

    // Toggle the input fields for person's name
    $("#person-name-yes").on('change', () => {
        if ($("#person-name-yes").is(':checked')) {
            $('#name-is-known').css('display','block')
        }
    })
    $("#person-name-no").click(() => {
        if ($("#person-name-no").is(':checked')) {
            $('#name-is-known').css('display','none')
        }
    })
})
