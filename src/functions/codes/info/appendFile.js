const fs = require('fs')

module.exports = {
    description: 'Appends content to the end of the file, if the file exists.',
    usage: 'path | content | returnNewContent?',
    parameters: [
        {
            name: 'Path',
            description: 'The path to append content.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Content',
            description: 'The content to be append.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Return new content',
            description: 'Whether to return the file\'s new content or not.',
            optional: 'true',
            defaultValue: 'false'
        }
    ],
    run: async d => {
        let [path, content, returnNewContent = 'true'] = d.func.params.splits;

        if (path == undefined) return d.throwError.func(d, 'path field is required')

        try {
            fs.appendSync(path, content)
        } catch (e) {
            return d.throwError.func(d, e.message)
        }

        return returnNewContent === 'true' ? fs.readFileSync(path).toString() : undefined
    }
}