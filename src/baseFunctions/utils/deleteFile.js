const fs = require('fs')

module.exports = {
    description: 'Deletes a file.',
    usage: 'path',
    parameters: [
        {
            name: 'Path',
            description: 'The file path to delete.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, path) => {
        if (path == undefined) return new d.error("required", d, 'path')

        try {
            fs.unlinkSync(path)
        } catch (e) {
            return new d.error("custom", d, e.message)
        }
    }
}