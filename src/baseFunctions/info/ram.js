module.exports = {
    description: 'Returns the total RAM used.',
    usage: 'type',
    parameters: [
        {
            name: 'Type',
            description: 'The RAM type.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, type = 'rss', decimals = '2') => {
        if (isNaN(decimals) || decimals < 0) return new d.error("invalid", d, 'decimals count', decimals)

        const memoryUsage = process.memoryUsage()
        if (!memoryUsage[type]) return new d.error("invalid", d, 'type', type)
        
        return (memoryUsage[type] / 1024 / 1024).toFixed(decimals);
    }
}