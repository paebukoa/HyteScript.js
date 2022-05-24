const fs = require('fs')

class Database {
    constructor(name, entries, options) {

        if (!fs.existsSync("database")) fs.mkdirSync('database')

        let content;

        if (!fs.existsSync(`database/${name}.json`)) {
            fs.appendFileSync(`database/${name}.json`, `{}`) 
            content = {}
        }
        else content = JSON.parse(fs.readFileSync(`database/${name}.json`).toString())

        Object.assign(this, {
            path: `database/${name}.json`,
            entries,
            content, 
            options
        })
    }

    async get(entryName, additional = '') {
        let value = this.content[entryName + additional]

        return value != undefined ? value : this.entries[entryName]
    }

    async set(entryName, entryValue, additional = '') {
        this.content[entryName + additional] = entryValue
        
        fs.writeFileSync(this.path, JSON.stringify(this.content, null, 2))
    }

    async has(entryName, additional = '') {
        return this.content[entryName + additional] ? true : false;
    }

    async delete(entryName, additional = '') {
        delete this.content[entryName + additional]
        
        fs.writeFileSync(this.path, JSON.stringify(this.content, null, 2))

        return true;
    }

}

module.exports = Database