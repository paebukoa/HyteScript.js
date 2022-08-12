const fs = require('fs')

module.exports = {
    description: 'Returns file size in MB.',
    usage: 'path | decimals?',
    parameters: [
        {
            name: 'Path',
            description: 'The file path.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Decimals',
            description: 'How many decimals should be shown.',
            optional: 'true',
            defaultValue: '2'
        }
    ],
    run: async (d, path, decimals = '2') => {
        if (path == undefined) return new d.error("custom", d, 'path field is required')
        if (isNaN(decimals) || decimals < 0) return new d.error("invalid", d, 'decimals count', decimals)

        try {
            const file = fs.statSync(path)
            return (file.size / 1024).toFixed(2);
        } catch (e) {
            return new d.error("custom", d, e.message)
        }
    }
}