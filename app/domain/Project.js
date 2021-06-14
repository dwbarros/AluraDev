class Project {
    
    constructor(name, description, lp, color, code) {
        this._name = name
        this._description = description
        this._lp = lp
        this._color = color
        this._code = code
        Object.freeze(this)
    }

    get name() {
        return this._name
    }

    get description() {
        return this._description
    }

    get lp() {
        return this._lp
    }

    get color() {
        return this._color
    }

    get code() {
        return this._code
    }

    set name(name) {
        this._name = name
    }

    set lp(lp) {
        this._lp = lp
    }

    set description(description) {
        this._description = description
    }

    set color(color) {
        this._color = color
    }

    set code(code) {
        this._code = code
    }
}