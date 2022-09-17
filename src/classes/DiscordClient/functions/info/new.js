const { getProperty } = require("../../utils/utils");

module.exports = {
    run: async (d, property) => {
        if (d.new == undefined) return new d.error('custom', d, `#(new) cannot be used in ${d.eventType} command`);

        if (property == undefined) return new d.error('required', d, 'property')

        return getProperty(d.newType, d.new, property)
    }
};