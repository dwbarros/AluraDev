import { Project } from '../domain/Project.js'
import { ProjectDao } from '../dao/ProjectDao.js'
import { ConnectionFactory } from '../services/ConnectionFactory.js'


export class ProjectController {

    constructor() {

        const $ = document.querySelector.bind(document)
        
        this._id = null
        this._inputName = $('.custom__project__name')
        this._inputDescription = $('.custom__project__description')
        this._inputLP = $('.custom__config__lp')
        this._inputColor = $('.custom__config__color')
        this._inputCode = $('.editor__code')
    }

    createProject() {

        ConnectionFactory
            .getConnection()
            .then(connection => {

                let project = this._newProject()

                new ProjectDao(connection)
                    .addProject(project)
                    .then(() => {
                        this._clearForm()
                    })
            })
            .catch(erro => { 
                alert('Erro ao criar projeto')
                console.log('Erro ao criar projeto: ' + erro)
            })
    }

    updateProject(key) {
        window.location = "./index.html"
        this._id = key

        ConnectionFactory
            .getConnection()
            .then(connection => {
                new ProjectDao(connection)
                    .getProject(key)
                    .then(project => {
                        console.log(project)
                    })
            })
            .catch(err => {
                alert('Erro ao tentar editar o Projeto')
                console.log('Erro ao tentar editar o Projeto: ' + err)
            })
    }

    _newProject() {
        return new Project(
            null,
            this._inputName.value, 
            this._inputDescription.value, 
            this._inputLP.value, 
            this._inputColor.value,
            this._inputCode.innerText
        )
    }

    _clearForm() {
        this._inputName.value = ''
        this._inputDescription.value = '' 
        this._inputCode.innerText = ''
    }
}