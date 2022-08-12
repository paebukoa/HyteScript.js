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
        let [path] = d.function.parameters;

        if (path == undefined) return new d.error("custom", d, 'path field is required')

        try {
            fs.unlinkSync(path)
        } catch (e) {
            return new d.error("custom", d, e.message)
        }
    }
}