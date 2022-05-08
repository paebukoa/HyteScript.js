module.exports = async d => {
    let [index = 'all'] = d.func.params.splits;

    if (index == undefined) return d.throwError.func(d, 'index field is required')

    if (!['default'].includes(d.eventType))

    if (isNaN(index) && index.toLowerCase() !== 'all') return d.throwError.invalid(d, 'element index', index);

    return index.toLowerCase() === "all"? d.args.join(" ") : d.args.at(Number(index));
};