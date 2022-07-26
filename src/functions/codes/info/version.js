const package = require('./../../../../package.json')

module.exports = {
    run: async (d) => {
        return package.version
    }
}