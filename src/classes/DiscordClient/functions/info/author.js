const { getProperty } = require("../../utils/utils");

module.exports = async (d, property = 'id') => {
    if (property == undefined) return new d.error('required', d, 'property')

    return getProperty('user', d.author, property)
};