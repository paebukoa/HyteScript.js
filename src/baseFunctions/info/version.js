module.exports = {
    description: 'Returns installed version of HyteScript.js.',
    usage: '',
    parameters: [],
    run: async (d) => {
        return d.data.version
    }
}