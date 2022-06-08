const fs = require('fs')

class InternalDatabase {
    constructor(options = {}) {
        let path = `./db/internal.json`
        let content = JSON.parse(fs.readFileSync(path).toString())

        Object.assign(this, {
            path,
            content, 
            options
        })
    }

    get(entryName, additional = '') {
        let value = this.content[entryName + additional]

        return value != undefined ? value : this.entries[entryName]
    }

    set(entryName, entryValue, additional = '') {
        this.content[entryName + additional] = entryValue
        
        fs.writeFileSync(this.path, JSON.stringify(this.content, null, 2))
    }

    has(entryName, additional = '') {
        return this.content[entryName + additional] ? true : false;
    }

    delete(entryName, additional = '') {
        delete this.content[entryName + additional]
        
        fs.writeFileSync(this.path, JSON.stringify(this.content, null, 2))

        return true;
    }

}

module.exports = InternalDatabase