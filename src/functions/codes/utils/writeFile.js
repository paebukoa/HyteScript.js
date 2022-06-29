const fs = require('fs')

module.exports = {
    description: 'Writes a file, replaces file content if file exists.',
    usage: 'path | content?',
    parameters: [
        {
            name: 'Path',
            description: 'The file path.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Content',
            description: 'The file content.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async d => {
        let [path, content] = d.func.params.splits;

        if (path == undefined) return d.throwError.func(d, 'path field is required')

        try {
            fs.writeFileSync(path, content)
        } catch (e) {
            return d.throwError.func(d, e.message)
        }
    }
}