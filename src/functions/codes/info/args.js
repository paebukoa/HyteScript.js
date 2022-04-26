module.exports = async d => {
    let [index] = d.func.params.splits;

    if (!['default'].includes(d.eventType))

    if (isNaN(index)) return d.throwError.invalid(d, 'element index', index);

    return index === "all"? d.args.join(" ") : d.args.at(Number(index));
};