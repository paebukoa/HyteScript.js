module.exports = async d => {
    let [min = "1", max = "10"] = d.function.parameters;

    if (isNaN(min)) return new d.error("invalid", d, 'number', min);
    if (isNaN(max)) return new d.error("invalid", d, 'number', max);
    if (Number(min) >= Number(max)) return new d.error("custom", d, `minimum value must be greater than maximum value`);

    return Math.round(Math.random() * (Number(max) - Number(min))) + Number(min);
}