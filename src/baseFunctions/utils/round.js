module.exports = async d => {
    let [num, steps = '0'] = d.function.parameters;

    if (isNaN(num)) return new d.error("invalid", d, `number`, num);

    if (isNaN(steps) || Number(steps) < 0 || Number(steps) > 100) return new d.error("custom", d, `steps field must be a number and must be between 0 and 100`);

    return Number(num).toFixed(steps);
};