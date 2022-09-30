module.exports = {
    description: 'Sets the month (from 1 to 12) of a date.',
    usage: 'name | value',
    parameters: [
        {
            name: 'Name',
            description: 'The date variable name.',
            optional: 'false',
            defaultValue: 'none'
        }, {
            name: 'Value',
            description: 'The new value for month.'
        }
    ],
    async run (d, name, value) {
        if (name == undefined) return new d.error("required", d, 'name')

        let date = d.data.dates[name.toLowerCase()]
        if (!date) return new d.error("invalid", d, 'name', name)

        if (isNaN(value) || Number(value) < 1 || Number(value) > 12) return new d.error('invalid', d, 'value', value)
        
        date.setMonth(Number(value) - 1)
    }
};