module.exports = async d => {
    let [text, type = "includes", jointer = ",", name = "default"] = d.params.splits;

    if (!d.utils.array[name]) return d.error.invalidError(d, "array name", name);

    let types = {
        includes(x) {return x.toLowerCase().includes(text)},
        startsWith(x) {return x.toLowerCase().startsWith(text)},
        endsWith(x) {return x.toLowerCase().endsWith(text)},
        equals(x) {return x.toLowerCase() === text}
    };
    let check = types[type];
    if (!check) return d.error.invalidError(d, "type", type);

    d.result = d.utils.array[name].filter(x => check(x)).join(jointer);
}