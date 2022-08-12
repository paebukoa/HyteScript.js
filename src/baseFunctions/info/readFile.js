const fs = require('fs')

module.exports = {
    description: 'Returns a file content.',
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
            const file = fs.readFileSync(path)
            return file?.toString?.();
        } catch (e) {
            return new d.error("custom", d, e.message)
        }

    }
}