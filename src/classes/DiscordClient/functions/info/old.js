const { getProperty } = require("../../utils/utils");

module.exports = {
    run: async (d, property) => {
        if (d.old == undefined) return new d.error('custom', d, `#(old) cannot be used in ${d.eventType} command`);

        if (property == undefined) return new d.error('required', d, 'property')

        return getProperty(d.oldType, d.old, property)
    }
};