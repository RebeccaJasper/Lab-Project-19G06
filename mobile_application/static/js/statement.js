

$(document).ready(() => {
    // Object for holding submission information
    var submission = new Object()

    // Toggle all further details based on whether the person is known or not
    $("#known-before-yes").on('change', () => {
        if ($("#known-before-yes").is(':checked')) {
            $('.details').css('display','block')
            submission.foreknown = true
        }

        $("#submit-btn").css('display','block')
    })
    $("#known-before-no").click(() => {
        if ($("#known-before-no").is(':checked')) {
            $('.details').css('display','none')
            submission.foreknown = false
        }
        $("#submit-btn").css('display','block')
    })

    // Toggle the input fields for person's name
    $("#person-name-yes").on('change', () => {
        if ($("#person-name-yes").is(':checked')) {
            $('#name-is-known').css('display','block')
            submission.nameKnown  = true
        }
    })
    $("#person-name-no").click(() => {
        if ($("#person-name-no").is(':checked')) {
            $('#name-is-known').css('display','none')
            submission.nameKnown  = false
        }
    })

    // Submission
    $("#submit-btn").click(()=> {
        // Get the person's name
        if ($("#person-name-yes").is(':checked')) {
            submission.firstName = ("#firstname").val()
            submission.surname = ("#surname").val()
        }
    })
})
