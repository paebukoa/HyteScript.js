module.exports = {
    description: 'Replies a message.',
    usage: 'messageId?',
    parameters: [
        {
            name: 'Message ID',
            description: 'The messsage ID to reply.',
            optional: 'true',
            defaultValue: 'Author\'s message ID'
        }
    ],
    run: async (d, messageReference = d.message?.id) => {
        d.data.message.reply = { messageReference }
    }
}