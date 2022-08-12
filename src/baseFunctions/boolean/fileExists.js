const fs = require('fs')

module.exports = {
    description: 'Returns whether a file exists or not.',
    usage: 'path',
    parameters: [
        {
            name: 'Path',
            description: 'The file path.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, path) => {
        if (path == undefined) return new d.error("required", d, 'path')

        try {
            return fs.existsSync(path)
        } catch (e) {
            return new d.error("custom", d, e.message)
        }
    }
}