const os = require('os')

module.exports = {
    description: 'Returns the max RAM.',
    usage: 'decimals?',
    parameters: [
        {
            name: 'Decimals',
            description: 'Amount of decimals.',
            optional: 'true',
            defaultValue: '2'
        }
    ],
    run: async d => {
        let [decimals = '2'] = d.func.params.splits

        if (isNaN(decimals) || decimals < 0) return d.throwError.invalid(d, 'decimals count', decimals)
        
        let maxRam = os.totalmem() / 1024 / 1024
        return maxRam.toFixed(decimals)
    }
}