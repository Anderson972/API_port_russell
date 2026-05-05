

//Suppression de la class "is-invalid" lors de l'écriture dans les champs login
document.addEventListener('DOMContentLoaded', () => {
    const form_log = document.getElementById('form_log');

    if (form_log){
        form_log.addEventListener('input', (e) => {
            e.target.classList.remove('is-invalid')
            console.log(e.target)
        });
    }
});
//update success
function succ_msg() {
    const succ_msg = document.getElementById('succ_msg')
    succ_msg.classList.add('voir')
        setTimeout(() => {
          succ_msg.classList.remove('voir')
        }, 5000)
}
function err_msg() {
    const succ_msg = document.getElementById('err_msg')
    succ_msg.classList.add('voir')
        setTimeout(() => {
          succ_msg.classList.remove('voir')
        }, 5000)
}

// DELETE reservation via fetch
async function deleteOne(path) {
    const response = await fetch(path, {
        method : 'DELETE'
    })
    window.location.reload()

    if (response.ok) {
        succ_msg()
    }else{
        err_msg()
    }
}

//Utilisation PUT via fetch
async function updateOne(path) {
    const form = document.getElementById('form_update')
    const formData = new FormData(form)
    

   const response = await fetch(path, {
        method  : 'PUT',
        headers : { 'Content-Type': 'application/json' },
        body    : JSON.stringify(Object.fromEntries(formData))
    })

    if (response.ok) {
        succ_msg()
    }else{
        err_msg()
    }
    
}
// initialisation des tooltips bootstrap
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el))

//create success 
document.addEventListener('DOMContentLoaded', () => {
    const msg = document.getElementById('succ_msg')
    if (msg && msg.classList.contains('d-block')) {
        
        //Nettoyage url
        window.history.replaceState({}, document.title, window.location.pathname)

        setTimeout(() => {
            msg.classList.replace('d-block', 'd-none')
        }, 5000)
    }
})
// create error
document.addEventListener('DOMContentLoaded', () => {
    const msg = document.getElementById('err_create')
    if (msg && msg.classList.contains('d-block')) {
        
        //Nettoyage url
        window.history.replaceState({}, document.title, window.location.pathname)

        setTimeout(() => {
            msg.classList.replace('d-block', 'd-none')
        }, 5000)
    }
})

//hide create button
document.addEventListener('DOMContentLoaded', () => {
    const btn        = document.getElementById('create_btn')
    const collapse   = document.getElementById('collapseCreate')

    if (btn && collapse) {
        collapse.addEventListener('show.bs.collapse', () => {
            btn.classList.add('d-none')
        })

        collapse.addEventListener('hide.bs.collapse', () => {
            btn.classList.remove('d-none')
        })
    }
})