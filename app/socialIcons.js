likeIcon = document.querySelectorAll('.like-icon')

likeIcon.forEach(element => {
    element.addEventListener('click', (event) => {
        event.preventDefault()
        const lnk = event.target

        let p = lnk.querySelector('p')

        if (lnk.classList.contains('social-icon--active')) {
            lnk.classList.toggle('social-icon--active')
            if (p.textContent === 0) {
                return
            } else {
                p.textContent = parseInt(p.textContent) - 1
            }

        } else {
            lnk.classList.toggle('social-icon--active')
            p.textContent = parseInt(p.textContent) + 1
        }
    })
})







