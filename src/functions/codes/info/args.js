module.exports = {
    run: async (d, index = 'all') => {
        if (index == undefined) return d.throwError.func(d, 'index field is required')

        if (!['default'].includes(d.eventType)) return d.throwError.allow(d)

        if (isNaN(index) && index.toLowerCase() !== 'all') return d.throwError.invalid(d, 'element index', index);

        return d.utils.escape(index.toLowerCase() === "all"? d.args.join(" ") : Number(index) > 0 ? d.args.at(Number(index) - 1) : d.args.at(Number(index)));
    }
}