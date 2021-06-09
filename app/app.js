let controller = new ProjectController()

const $ = document.querySelector.bind(document)

$('.custom__form').addEventListener('submit', controller.createProject.bind(controller))