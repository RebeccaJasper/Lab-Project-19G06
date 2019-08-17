$(document).ready(() => {
    if (typeof window.sessionStorage.getItem('photo_id') == 'undefined' ||
        typeof window.sessionStorage.getItem('photo_id') == 'object') {
        $('.continue-btn').click(() => {
            window.location = '/consent-form'
        })
    } else {
        window.location = window.sessionStorage.getItem('prevRoute')
    }
})
