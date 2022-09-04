module.exports = {
    description: 'Logs a message in console.',
    usage: 'message',
    parameters: [
        {
            name: 'Message',
            description: 'The message to be logged.',
            optional: 'false',
            defaultValue: 'none'
        }
    ],
    run: async (d, message) => {
        if (message == undefined) return new d.error('required', d, 'message')

        console.log(message);
    }
};