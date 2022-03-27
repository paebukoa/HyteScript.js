module.exports = async d => {
    let [num, steps = '0'] = d.func.params.splits;

    if (isNaN(num)) return d.throwError.invalid(d, `number`, num);

    if (isNaN(steps) || Number(steps) < 0 || Number(steps) > 100) return d.throwError.func(d, `steps field must be a number and must be between 0 and 100`);

    return Number(num).toFixed(steps);
};