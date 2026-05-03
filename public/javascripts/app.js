document.addEventListener('DOMContentLoaded', () => {
    const form_log = document.getElementById('form_log');

    if (form_log){
        form_log.addEventListener('input', (e) => {
            e.target.classList.remove('is-invalid')
            console.log(e.target)
        });
    }
});


async function deleteRes(catwayId, resId) {
    await fetch(`/catways/${catwayId}/reservations/${resId}`, {
        method : 'DELETE'
    })
    window.location.reload()
}