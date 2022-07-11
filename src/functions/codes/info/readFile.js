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
        if (path == undefined) return d.throwError.required(d, 'path')

        try {
            const file = fs.readFileSync(path)
            return file?.toString?.();
        } catch (e) {
            return d.throwError.func(d, e.message)
        }

    }
}