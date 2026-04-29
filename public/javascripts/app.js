document.addEventListener('DOMContentLoaded', () => {
    const form_log = document.getElementById('form_log');

    if (form_log){
        form_log.addEventListener('input', (e) => {
            e.target.classList.remove('is-invalid')
            console.log(e.target)
        });
    }
});


/* password_log.addEventListener('input', (e) => {
    e.target.classList.remove('is-invalid')
}); */