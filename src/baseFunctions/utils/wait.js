const { Time, wait } = require("../../utils/BaseUtils");

module.exports = {
    description: 'Pauses the code execution.',
    usage: 'time',
    parameters: [
        {
            name: 'Time',
            description: 'How many time to pause code execution.\nRead about parameters with type time.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, time) => {
        if (time == undefined) return new d.error("required", d, 'time')

        let parsedTime = Time.parseTime(time)
        if (parsedTime.error) return new d.error("invalid", d, 'time', time)
        
        await wait(parsedTime.ms)
    }
}