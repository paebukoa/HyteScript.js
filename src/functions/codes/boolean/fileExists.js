const fs = require('fs')

module.exports = {
    description: '',
    usage: '',
    parameters: [
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: '',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async d => {
        let [path] = d.func.params.splits;

        if (path == undefined) return d.throwError.func(d, 'path field is required')

        try {
            return fs.existsSync(path)
        } catch (e) {
            return d.throwError.func(d, e.message)
        }
    }
}