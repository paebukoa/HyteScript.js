module.exports = async d => {
    let [index = 'all'] = d.func.params.splits;

    if (index == undefined) return d.throwError.func(d, 'index field is required')

    if (!['default'].includes(d.eventType)) return d.throwError.allow(d)

    if (isNaN(index) && index.toLowerCase() !== 'all') return d.throwError.invalid(d, 'element index', index);

    return index.toLowerCase() === "all"? d.args.join(" ") : Number(index) > 0 ? d.args.at(Number(index) - 1) : d.args.at(Number(index));
};