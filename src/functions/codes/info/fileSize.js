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
        let [path, decimals = '2'] = d.func.params.splits;

        if (path == undefined) return d.throwError.func(d, 'path field is required')
        if (isNaN(decimals) || decimals < 0) return d.throwError.invalid(d, 'decimals count', decimals)

        try {
            const file = fs.statSync(path)
            console.log(file)
            return (file.size / 1024).toFixed(2);
        } catch (e) {
            return d.throwError.func(d, e.message)
        }
    }
}