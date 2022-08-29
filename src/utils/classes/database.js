const fs = require('fs')

class Database {
    constructor(name, foldername, entries = {}, options = {}) {
        if (!fs.existsSync(`hytescript`)) fs.mkdirSync(`hytescript`)
        if (!fs.existsSync(`hytescript/${foldername}`)) fs.mkdirSync(`hytescript/${foldername}`)

        let content;

        if (!fs.existsSync(`hytescript/${foldername}/${name}.json`)) {
            fs.appendFileSync(`hytescript/${foldername}/${name}.json`, `{}`) 
            content = {}
        }
        else content = JSON.parse(fs.readFileSync(`hytescript/${foldername}/${name}.json`).toString())

        Object.assign(this, {
            path: `hytescript/${foldername}/${name}.json`,
            entries,
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
        return this.content[entryName + additional] != undefined ? true : false;
    }

    delete(entryName, additional = '') {
        delete this.content[entryName + additional]
        
        fs.writeFileSync(this.path, JSON.stringify(this.content, null, 2))

        return true;
    }
	filter(fn) {
	    let results = []
		for (const key in this.content) {
			if (Object.prototype.hasOwnProperty(this.content, key)) {
                let value = this.content[key]
				let result = {}
                if (!!fn(key, value)) {
					result[key] = value
                    results.push(result)
				}
			}
		}

		return results
    }
}

module.exports = Database