module.exports = {
    description: '',
    usage: 'name | date?',
    parameters: [
        {
            name: 'Name',
            description: '',
            optional: 'false',
            defaultValue: 'none'
        },
        {
            name: 'Date',
            description: '',
            optional: 'true',
            defaultValue: 'none'
        }
    ],
    async run(d, name, date) {
        if (name == undefined) return new d.error("required", d, "name");

        if (date != undefined) {
            let date = new Date(date)
            if (date == "Invalid Date") return new d.error("invalid", d, 'date', date)

            d.data.dates[name.toLowerCase()] = date
        } else {
            d.data.dates[name.toLowerCase()] = new Date()
        }
    }
};