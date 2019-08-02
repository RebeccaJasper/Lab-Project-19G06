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
        $('#name-is-known').toggle()
    })
    $("#person-name-no").on('change', () => {
        $('#name-is-known').toggle()
    })
})
