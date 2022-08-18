const os = require('os')

module.exports = {
    description: 'Returns the max RAM.',
    usage: 'decimals?',
    parameters: [
        {
            name: 'Decimals',
            description: 'Amount of decimals to be returned.',
            optional: 'true',
            defaultValue: '2'
        }
    ],
    run: async (d, decimals = '2') => {
        if (isNaN(decimals) || decimals < 0) return new d.error("invalid", d, 'decimals', decimals)
        
        let maxRam = os.totalmem() / 1024 / 1024
        return maxRam.toFixed(decimals)
    }
}