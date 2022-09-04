module.exports = {
    description: 'Rounds a number.',
    usage: 'number',
    parameters: [
        {
            name: 'Number',
            description: 'The number to be rounded.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, number) => {
        if (number == undefined) return new d.error('required', d, 'number');

        if (isNaN(number)) return new d.error("invalid", d, `number`, number);

        return Math.round(Number(number));
    }
};