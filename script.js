const navBar = document.querySelectorAll('.nav-bar')[0]
const menu = document.querySelector('.menu')

//time for work

//menu deslizante no mobile
menu.addEventListener('click', toggleClassMenu, false)

var isOpen = false

function toggleClassMenu(){
    if(isOpen == false){
        navBar.classList.add("menu-open")
        menu.firstElementChild.classList.add('hamburguer-x')
        isOpen = true
    }
    else {
        navBar.classList.remove('menu-open')
        menu.firstElementChild.classList.remove('hamburguer-x')
        isOpen = false
    }
}