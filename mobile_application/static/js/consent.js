$(document).ready(() => {
    if (typeof window.sessionStorage.getItem('photo_id') == 'undefined' ||
        typeof window.sessionStorage.getItem('photo_id') == 'object') {
         $('#consent-checkbox').change(() => {
            if  ($('#consent-checkbox').is(':checked')) {
                window.location = "/instructions"
            }
        })
    } else {
        window.location = window.sessionStorage.getItem('prevRoute')
    }
})