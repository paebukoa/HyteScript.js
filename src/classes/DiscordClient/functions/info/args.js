const { escape } = require("../../utils/utils");

module.exports = {
    run: async (d, index = 'all') => {
        if (!['default'].includes(d.eventType)) return new d.error("notAllowed", d, 'default type')
        
        if (index == undefined) return new d.error("required", d, 'index')

        if (isNaN(index) && index.toLowerCase() !== 'all') return new d.error("invalid", d, 'element index', index);

        return escape(index.toLowerCase() === "all"? d.args.join(" ") : Number(index) > 0 ? d.args.at(Number(index) - 1) : d.args.at(Number(index)));
    }
}