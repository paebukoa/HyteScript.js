module.exports = async d => {
    let [text, name = "default"] = d.params.splits;

    if (!d.utils.array[name]) return d.error.invalidError(d, "array name", name);

    d.result = d.utils.array[name].indexOf(text);
}