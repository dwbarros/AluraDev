import { Project } from '../domain/Project.js'
import { ProjectDao } from '../dao/ProjectDao.js'
import { ConnectionFactory } from '../services/ConnectionFactory.js'


export class ProjectController {

    constructor() {

        const $ = document.querySelector.bind(document)
        
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

    _newProject() {
        return new Project(
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