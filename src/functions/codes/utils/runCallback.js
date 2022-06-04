module.exports = async d => {
    let [name] = d.func.params.splits;

    let callback = d.data.callbacks.get(name.toLowerCase());
    if (!callback) return d.throwError.invalid(d, 'callback name', name);

    const parseCode = await d.reader.default(d, callback.code);

    return parseCode.result;
};