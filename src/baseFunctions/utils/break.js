module.exports = {
    description: 'Breaks code or block code execution.',
    usage: '',
    parameters: [],
    run: async d => {
        d.data.break = true
        d.err = true
}};