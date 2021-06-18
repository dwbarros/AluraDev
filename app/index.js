import { ProjectController } from './controllers/ProjectController.js'


let controller = new ProjectController()

document
    .querySelector('.custom__form')
    .addEventListener('submit', controller.createProject.bind(controller))