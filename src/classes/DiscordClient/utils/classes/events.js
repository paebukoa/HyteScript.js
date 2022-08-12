const { getDirFiles, replaceLast } = require('../../../../utils/BaseUtils')

module.exports = class Events {
    _events = {}

    constructor() {
        let files = getDirFiles(`${__dirname}/../../events`)

        for (const file of files) {
            let fn = require(file.path)

            this._events[replaceLast(file.name, '.js', '').toLowerCase()] = fn
        }
    }

    set(name, fn) {
        this._events[name.toLowerCase()] = fn
    }
    get(name) {
        return this._events[name.toLowerCase()]
    }
    has(name) {
        return this._events[name.toLowerCase()] != undefined
    }
    delete(name) {
        if (this.has(name)) return eval(`delete this._events.${name}`)
        else return false
    }
}