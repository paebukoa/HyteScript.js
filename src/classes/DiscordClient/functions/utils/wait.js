const Time = require("../../../codings/time");

module.exports = {
    description: 'Pauses the code execution.',
    usage: 'time',
    parameters: [
        {
            name: 'Time',
            description: 'How many time to pause code execution. \nRead about parameters with type time.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, time) => {
        if (time == undefined) return d.throwError.required(d, 'time')

        let parsedTime = Time.parseTime(time)
        if (parsedTime.error) return d.throwError.invalid(d, 'time', time)
        
        await d.utils.wait(parsedTime.ms)
    }
}