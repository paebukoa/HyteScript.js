module.exports = async d => {
    let [elements, name = "default"] = d.params.splits;

    if (!d.utils.array[name]) return d.error.invalidError(d, "array name", name);

    d.utils.array[name] = d.utils.array[name].concat(elements.split(","));
};