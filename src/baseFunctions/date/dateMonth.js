module.exports = {
    description: 'Returns the month number of a date.',
    usage: 'name',
    parameters: [
        {
            name: 'Name',
            description: 'The date variable name.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    async run (d, name) {
        if (name == undefined) return new d.error("required", d, 'name')

        let date = d.data.dates[name.toLowerCase()]
        if (!date) return new d.error("invalid", d, 'name', name)

        return date.getMonth() + 1
    }
};