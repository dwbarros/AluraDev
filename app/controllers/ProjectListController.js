import { ProjectList } from '../domain/ProjectList.js'
import { ProjectListView } from '../views/ProjectListView.js'
import { ProjectDao } from '../dao/ProjectDao.js'
import { ConnectionFactory } from '../services/ConnectionFactory.js'


export class ProjectListController {

    constructor() {
        const $ = document.querySelector.bind(document)

        this._projectList = new ProjectList()
        this._projectListView = new ProjectListView('.project__cards')
        this._init()

    }

    _init() {
        ConnectionFactory
            .getConnection()
            .then(connection => {
                new ProjectDao(connection)
                    .listAllProjects()
                    .then(projects => {
                        projects.forEach(project => {
                            this._projectList.add(project)
                            this._projectListView.update(this._projectList)
                        });
                    })
            })
            .catch(err => {
                alert('Erro ao tentar listar os Projetos')
                console.log('Erro ao tentar listar os Projetos: ' + err)

            })
    }

    deleteAllProjects() {
        ConnectionFactory
            .getConnection()
            .then(connection => new ProjectDao(connection))
            .then(dao => dao.deleteAllProjects())
            .then(message => {
                alert(message)
                this._projectList.emptyOut()
                this._projectListView.update(this._projectList)
            })
    }
}