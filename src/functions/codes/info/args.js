const { escape } = require("../../../codings/utils");

module.exports = {
    run: async (d, index = 'all') => {
        if (!['default'].includes(d.eventType)) return d.throwError.notAllowed(d, 'default type')
        
        if (index == undefined) return d.throwError.required(d, 'index')

        if (isNaN(index) && index.toLowerCase() !== 'all') return d.throwError.invalid(d, 'element index', index);

        return escape(index.toLowerCase() === "all"? d.args.join(" ") : Number(index) > 0 ? d.args.at(Number(index) - 1) : d.args.at(Number(index)));
    }
}