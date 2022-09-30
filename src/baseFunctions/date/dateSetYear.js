module.exports = {
    description: 'Sets the year of a date.',
    usage: 'name | value',
    parameters: [
        {
            name: 'Name',
            description: 'The date variable name.',
            optional: 'false',
            defaultValue: 'none'
        }, {
            name: 'Value',
            description: 'The new value for year.'
        }
    ],
    async run (d, name, value) {
        if (name == undefined) return new d.error("required", d, 'name')

        let date = d.data.dates[name.toLowerCase()]
        if (!date) return new d.error("invalid", d, 'name', name)

        if (isNaN(value) || Number(value) < 0) return new d.error('invalid', d, 'value', value)
        
        date.setFullYear(Number(value))
    }
};