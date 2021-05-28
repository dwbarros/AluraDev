document.querySelector('.header__menu-icon')
.addEventListener("click", addEvent)

document.querySelector('.header__search-icon')
.addEventListener("click", addEvent)

document.querySelector('.header__close-icon')
.addEventListener("click", addEvent)

document.querySelector('.menu__close-icon')
.addEventListener("click", addEvent)

function addEvent() {
    element = document.querySelector('body')
    element.classList.toggle("menu-open")
}