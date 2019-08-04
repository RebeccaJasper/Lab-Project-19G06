$(document).ready(() => {
    $('#consent-checkbox').change(() => {
        if  ($('#consent-checkbox').is(':checked')) {
            window.location = "/instruction"
        }
    })

})