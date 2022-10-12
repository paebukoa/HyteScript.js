module.exports = {
    description: 'Returns an array slice.',
    usage: 'name | start | end? | separator?',
    parameters: [
        {
            name: 'Name',
            description: 'The array name.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Start',
            description: 'Which element the slice will start.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'End',
            description: 'Which element the slice will end.',
            optional: 'true',
            defaultValue: 'none'
        },
        {
            name: 'Separator',
            description: 'Characters which will separate slice elements.',
            optional: 'true',
            defaultValue: ','
        }
    ],
    run: async (d, name, start, end, separator = ',') => {
        if (name == undefined) return new d.error("required", d, 'name')
        if (start == undefined) return new d.error("required", d, 'start')
        
        if (!d.data.arrays[name]) return new d.error("invalid", d, 'array name', name);

        if (isNaN(start)) return new d.error("invalid", d, 'start index', start)
        if (isNaN(end) && end != undefined) return new d.error("invalid", d, 'end index', end)


        return d.data.arrays[name].slice(Number(start) > 0 ? Number(start) - 1 : Number(start), Number(end) || undefined).join(separator)
    }
};