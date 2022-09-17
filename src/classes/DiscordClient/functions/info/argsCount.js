module.exports = {
    description: 'Returns how many args have been provided in message.',
    usage: '',
    parameters: [],
    run: async d => {
        if (!['default'].includes(d.eventType)) return new d.error("notAllowed", d, 'default type')

        return d.args.length;
    }
}