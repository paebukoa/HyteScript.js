module.exports = async d => {
    let [start, end, sep = ',', name = 'default'] = d.func.params.splits;

    if (isNaN(start) && start != undefined) return d.throwError.invalid(d, 'start index', start)

    if (isNaN(end) && end != undefined) return d.throwError.invalid(d, 'end index', end)

    if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

    return d.data.arrays[name].slice(Number(start), end ? Number(end) : end).join(sep)
};