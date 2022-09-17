module.exports = {
    description: 'Returns the event type that the command is running.',
    usage: '',
    parameters: [],
    run: async d => {
        return d.eventType;
    }
};