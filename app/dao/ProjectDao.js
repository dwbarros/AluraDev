class ProjectDao {

    constructor(connection) {
        this._connection = connection
        this._store = 'projects'
    }

    addProject(project) {

        return new Promise((resolve, reject) => {

            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .add(project)
            
            request.onsuccess = e => {
                resolve()
            }

            request.onerror = e => {
                console.log(e.target.error)
                reject('Erro ao tentar gravar um Projeto')
            }
        })
    }

    listAllProjects() {

        return new Promise((resolve, reject) => {

            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor()

            let projects = []
            
            cursor.onsuccess = e => {
                let pointer = e.target.result

                if(pointer) {
                    let data = pointer.value

                    projects.push(new Project(
                        data._name, 
                        data._description, 
                        data._lp, 
                        data._color, 
                        data._code))

                    pointer.continue()

                } else {
                    resolve(projects)
                }
            }

            cursor.onerror = e => {
                console.log(e.target.error)
                reject('Erro ao tentar listar os Projetos')
            }
        })
    }
}