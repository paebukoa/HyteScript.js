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
        if (name == undefined) return d.throwError.required(d, 'name')
        if (start == undefined) return d.throwError.required(d, 'start')

        if (isNaN(start) && start != undefined) return d.throwError.invalid(d, 'start index', start)

        if (isNaN(end) && end != undefined) return d.throwError.invalid(d, 'end index', end)

        if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

        return d.data.arrays[name].slice(Number(start), end ? Number(end) : end).join(separator)
    }
};