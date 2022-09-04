module.exports = {
    description: 'Repeats a string for provided times.',
    usage: 'string | amount',
    parameters: [
        {
            name: 'String',
            description: 'String to repeat.',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Amount',
            description: 'The amount of times to repeat string.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, string, amount) => {
        if (string == undefined) return new d.error("required", d, `string`)
        if (amount == undefined) return new d.error("required", d, `amount`)

        if (isNaN(amount) || Number(amount) < 1) return new d.error('invalid', d, 'amount number', amount);

        return string.repeat(Number(amount));
}};