module.exports = {
    description: 'Returns a string slice.',
    usage: 'string',
    parameters: [
        {
            name: 'String',
            description: 'String to slice.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Start',
            description: 'Where in string to start slice.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'End',
            description: 'Where in string to end slice.',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    run: async (d, string, start, end) => {
        if (string == undefined) return new d.error('required', d, 'string');
        if (start == undefined) return new d.error('required', d, 'start');
        if (end == undefined) return new d.error('required', d, 'end');

        if (isNaN(start)) return new d.error('invalid', d, 'start number', start);
        if (isNaN(end) && end != undefined) return new d.error('invalid', d, 'end number', end);

       return string.slice(Number(start), Number(end) || undefined)
    }
};