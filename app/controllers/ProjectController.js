class ProjectController {

    constructor() {
        const $ = document.querySelector.bind(document)

        this._inputName = $('.custom__project__name')
        this._inputDescription = $('.custom__project__description')
        this._inputLP = $('.custom__config__lp')
        this._inputColor = $('.custom__config__color')
        this._inputCode = $('.editor__code')
        
        this._projectList = new ProjectList()
        this._projectView = new ProjectView('.project__cards')

        ConnectionFactory
            .getConnection()
            .then(connection => {
                new ProjectDao(connection)
                    .listAllProjects()
                    .then(projects => {
                        projects.forEach(project => {
                            this._projectList.add(project)
                            this._projectView.update(this._projectList)
                        });
                    })
            })
    }
    

    createProject(event) {

        // event.preventDefault()
        
        ConnectionFactory
            .getConnection()
            .then(connection => {

                let project = this._newProject()

                new ProjectDao(connection)
                    .addProject(project)
                    .then(() => {
                        this._projectList.add(project)
                        this._clearForm()
                        this._projectView.update(this._projectList)
                    })
            })
            .catch(erro => alert('Erro: ' + erro))
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