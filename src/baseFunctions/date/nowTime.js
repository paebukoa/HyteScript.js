module.exports = {
    description: 'Returns the exact current date in ms.',
    usage: '',
    parameters: [],
    run: async d => {
        return Date.now();
    }
}