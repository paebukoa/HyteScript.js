// dontParseParams

module.exports = {
    parseParams: false,
    run: async d => {
        let [name, code] = d.func.params.splits;

        const parseName = await d.reader.default(d, name);
        if (parseName?.error) return;

        name = parseName.result.unescape();

        d.data.callbacks.set(name, {code});
}
};