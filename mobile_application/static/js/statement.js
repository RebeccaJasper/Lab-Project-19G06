$(document).ready(() => {
    $("#person-name-yes").on('change', () => {
        $('#name-is-known').toggle()
    })
    $("#person-name-no").on('change', () => {
        $('#name-is-known').toggle()
    })
})
