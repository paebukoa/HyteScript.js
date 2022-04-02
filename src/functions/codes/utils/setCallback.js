// dontParseParams

module.exports = async d => {
    let [name, code] = d.func.params.splits;

    const parseName = await d.reader.default(d, name);
    name = parseName.result;

    d.data.callbacks.set(name, {code});
};