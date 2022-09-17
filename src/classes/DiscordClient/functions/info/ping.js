module.exports = {
    description: 'Returns the client ping.',
    usage: '',
    parameters: [],
    run: async d => {
        return d.client.ws.ping;
    }
}