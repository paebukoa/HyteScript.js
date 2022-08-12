const { getProperty } = require("../../utils/utils");

module.exports = async d => {
    let [property = 'id'] = d.function.parameters;

    return getProperty('client', d.client, property)
}