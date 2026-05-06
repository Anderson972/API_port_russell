

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

document.addEventListener('DOMContentLoaded', () => {
    const form              = document.getElementById('form_create')
    const password          = document.getElementById('password')
    const passwordConfirmed = document.getElementById('passwordConfirmed')
    const notSame           = document.getElementById('notSame')

    if (form && password && passwordConfirmed) {
       
        passwordConfirmed.addEventListener('input', () => {

            if (passwordConfirmed.value === '' && password.value === ''){
                passwordConfirmed.classList.remove('is-invalid')
                notSame.setAttribute('hidden','')

            }else if (passwordConfirmed.value === ''){
                passwordConfirmed.classList.remove('is-invalid')
                passwordConfirmed.classList.remove('is-valid')
                notSame.setAttribute('hidden','')

            }else if (passwordConfirmed.value !== password.value) {
                passwordConfirmed.classList.add('is-invalid')
                notSame.removeAttribute('hidden')
            }else {
                passwordConfirmed.classList.remove('is-invalid')
                passwordConfirmed.classList.add('is-valid')
                notSame.setAttribute('hidden','')
            }
        })

        form.addEventListener('submit', (e) => {
            if (password.value !== passwordConfirmed.value) {
                e.preventDefault()  //pas d'envoi
                passwordConfirmed.classList.add('is-invalid')
            }
        })
    }
})


//affichage password
function hidePassword(id, id_btn) {
    const password= document.getElementById(id)
    const btnHide = document.getElementById(id_btn)
    
    const hideSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
</svg>`

    const showSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
</svg>`

    if (password.type === 'password') {
        btnHide.innerHTML = showSvg
        password.setAttribute("type", "text")
    }else {
        btnHide.innerHTML = hideSvg
        password.setAttribute("type", "password")
    }
};