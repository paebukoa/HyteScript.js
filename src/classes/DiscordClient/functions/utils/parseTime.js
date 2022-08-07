const Time = require("../../../codings/time")

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
        if (time == undefined) return d.throwError.required(d, 'time')

        let parsedTime = Time.parseTime(time)
        if (parsedTime.error) return d.throwError.invalid(d, 'time', time)

        return parsedTime.ms
    }
}