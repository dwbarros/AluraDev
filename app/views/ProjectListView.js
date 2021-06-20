import { ProjectController } from "../controllers/ProjectController.js"

export class ProjectListView {

    constructor(element) {
        this._element = document.querySelector(element)
        this._likeIcon = null
        this._editorCode = null
        this._card = null
    }

    update(model) {
        this._element.innerHTML = this._template(model)
        this._highlightElements()
        this._setLikeIconEvents()
        this._setEvents()
    }

    _template(model) {
        return `
            ${model.toArray().map(project =>
            `
                <li class="project__card" data-key="${project.id}">
                    <div class="project__editor editor__container" style="background-color:${project.color}">
                        <div class="editor__ellipses">
                            <div class="editor__ellipse1"></div>

                            <div class="editor__ellipse2"></div>

                            <div class="editor__ellipse3"></div>
                        </div>

                        <code class="editor__code hljs">${project.code}</code>
                    </div>
                    
                    <article class="project__info">

                        <h3 class="project__title">${project.name}</h3>

                        <p class="project__description">${project.description}</p>

                        <div class="project__social-icons">
                            <a class="project__social-icon comment-icon" href="">
                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 0.25C4.47656 0.25 0 3.88672 0 8.375C0 10.3125 0.835938 12.0859 2.22656 13.4805C1.73828 15.4492 0.105469 17.2031 0.0859375 17.2227C0 17.3125 -0.0234375 17.4453 0.0273438 17.5625C0.078125 17.6797 0.1875 17.75 0.3125 17.75C2.90234 17.75 4.84375 16.5078 5.80469 15.7422C7.08203 16.2227 8.5 16.5 10 16.5C15.5234 16.5 20 12.8633 20 8.375C20 3.88672 15.5234 0.25 10 0.25Z" fill="white"/>
                                </svg>

                                <p class="project__social__count">0</p>
                            </a>

                            <a class="project__social-icon like-icon" href="">
                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.0587 1.44659C15.9181 -0.377597 12.7346 -0.0494787 10.7698 1.97783L10.0003 2.77078L9.23077 1.97783C7.26987 -0.0494787 4.08243 -0.377597 1.94185 1.44659C-0.51123 3.5403 -0.640134 7.29804 1.55514 9.56752L9.11359 17.3721C9.60186 17.876 10.3948 17.876 10.8831 17.3721L18.4415 9.56752C20.6407 7.29804 20.5118 3.5403 18.0587 1.44659Z" fill="white"/>
                                </svg>

                                <p class="project__social__count">0</p>
                            </a>

                            <a class="project__user user-link" href="">
                                <img src="./assets/img/user_img.jpeg" alt="Autor do Projeto">
                                
                                <h3>David William</h3>
                            </a>
                        </div>
                    </article>   
                </li>         
            `).join('')}
        `
    }

    _highlightElements() {
        this._editorCode = document.querySelectorAll('.editor__code')
        
        this._editorCode.forEach((element) => {
            hljs.highlightElement(element)
        })
    }

    _setLikeIconEvents() {

        this._likeIcon = document.querySelectorAll('.like-icon')

        this._likeIcon.forEach(element => {
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
                    return
                }
            })
        })        
    }


    _setEvents() {
        this._card = document.querySelectorAll('.project__card')
        
        this._card.forEach((element) => {
            element.addEventListener('click', () => {
                const projectController = new ProjectController
                projectController.updateProject(element.dataset.key)
            })
        })
    }

}