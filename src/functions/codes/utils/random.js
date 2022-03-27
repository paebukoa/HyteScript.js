module.exports = async d => {
    let [min = "1", max = "10"] = d.func.params.splits;

    if (isNaN(min)) return d.throwError.invalid(d, 'number', min);
    if (isNaN(max)) return d.throwError.invalid(d, 'number', max);
    if (Number(min) >= Number(max)) return d.throwError.func(d, `minimum value must be greater than maximum value`);

    return Math.round(Math.random() * (Number(max) - Number(min))) + Number(min);
}