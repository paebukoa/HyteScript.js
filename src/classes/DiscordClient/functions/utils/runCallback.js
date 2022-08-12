module.exports = async d => {
    let [name] = d.function.parameters;

    let callback = d.data.callbacks.get(name.toLowerCase());
    if (!callback) return new d.error("invalid", d, 'callback name', name);

    const parseCode = await d.reader.default(d, callback.code);

    return parseCode.result;
};