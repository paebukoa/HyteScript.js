module.exports = async d => {
    let [index = 'all'] = d.func.params.splits;

    if (isNaN(index) && index !== "all") return d.throwError.invalid(d, 'element index', index);

    return index === "all"? d.args.join(" ") : d.args.at(Number(index));
};