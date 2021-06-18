export class ProjectList {

    constructor() {
        this._projects = []
    }

    add (project) {
        this._projects.push(project)
    }

    toArray() {
        return [].concat(this._projects)
    }

    emptyOut() {
        this._projects.length = 0;
    }
}