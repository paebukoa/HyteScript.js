const childProcess = require('child_process')

module.exports = {
    description: 'Executes a command in shell.',
    usage: 'command',
    parameters: [
        {
            name: 'Command',
            description: 'The command to be executed.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    async run(d, command) {
        if (command == undefined) return new d.error("required", d, 'command')

        let result;

        try {
            result = childProcess.execSync(command)
        } catch (e) {
            return new d.error('custom', d, e.message)
        }
        
        return result.toString()
    }
};