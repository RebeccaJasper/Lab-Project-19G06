$(document).ready(() => {
    if (typeof window.sessionStorage.getItem('photo_id') == 'undefined' ||
        typeof window.sessionStorage.getItem('photo_id') == 'object') {
        $('#home-page-btn').click(() => {
            window.location = "/explanation"
        })
    } else {
        console.log(typeof window.sessionStorage.getItem('photo_id') == 'object')
        window.location = window.sessionStorage.getItem('prevRoute')
    }
})