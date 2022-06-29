// dontParseParams

module.exports = {
    parseParams: false,
    run: async d => {
        let [code, sep = ",", name = 'default'] = d.func.params.splits;

        let parsedName = await d.reader.default(d, name)
        if (parsedName?.error) return;

        name = parsedName.result.unescape()

        if (!d.data.arrays[name]) return d.throwError.invalid(d, "array name", name);

        let mapResult = [];

        for (const element of d.data.arrays[name]) {
            let codeWithElement = code.replaceAll(/{%arrElement}/ig, element);

            const parsedCode = await d.reader.default(d, codeWithElement);
            if (parsedCode?.error) return;

            mapResult.push(parsedCode.result.unescape());
        };

        let parsedSep = await d.reader.default(d, sep)
        if (parsedSep?.error) return;

        sep = parsedSep.result.unescape()

        return mapResult.join(sep);
    }
};