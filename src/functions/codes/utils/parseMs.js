const Time = require("../../../codings/time")

module.exports = {
    description: 'Parses miliseconds and returns time in string.',
    usage: 'miliseconds | type?',
    parameters: [
        {
            name: 'Miliseconds',
            description: 'Amount of miliseconds to be parsed.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Type',
            description: 'Type to be returned.\nFull = 1 week, 2 months...\nDefault = 1w, 2mo...',
            optional: 'true',
            defaultValue: 'default'
        }
    ],
    run: async (d, ms, type = 'default') => {
        if (ms == undefined) return d.throwError.required(d, 'miliseconds')

        if (isNaN(ms) || ms < 0) return d.throwError.invalid(d, 'miliseconds', ms)

        let parsedMs = Time.parseMs(ms)

        let types = {
            full: 'full',
            default: 'sum' 
        }

        let returnType = types[type]
        if (!returnType) return d.throwError.invalid(d, 'type', type)
        
        let parsed = parsedMs[returnType]

        return parsed;
    }
}