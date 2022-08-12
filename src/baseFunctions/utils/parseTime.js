const { Time } = require("../../utils/BaseUtils")

module.exports = {
    description: 'Parses time and returns miliseconds.',
    usage: 'time',
    parameters: [
        {
            name: 'Time',
            description: 'The time to be parsed.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, time) => {
        if (time == undefined) return new d.error("required", d, 'time')

        let parsedTime = Time.parseTime(time)
        if (parsedTime.error) return new d.error("invalid", d, 'time', time)

        return parsedTime.ms
    }
}