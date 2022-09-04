module.exports = {
    description: 'Returns a random number between provided numbers.',
    usage: 'min | max',
    parameters: [
        {
            name: 'Min',
            description: 'The min value to be returned.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Max',
            description: 'The max value to be returned.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, min, max) => {
        if (min == undefined) return new d.error('required', d, 'min');
        if (max == undefined) return new d.error('required', d, 'max');

        if (isNaN(min)) return new d.error("invalid", d, 'number', min);
        if (isNaN(max) || Number(max) < Number(min)) return new d.error("invalid", d, 'number', max);

        return Math.round(Math.random() * (Number(max) - Number(min))) + Number(min);
    }
}