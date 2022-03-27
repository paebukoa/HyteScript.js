// dontParseParams

module.exports = async d => {
    let [code, sep = ",", name = 'default'] = d.func.params.splits;

    if (!d.data.arrays[name]) return d.throwError.invalid(d, "array name", name);

    let mapResult = [];

    for (const element of d.data.arrays[name]) {
        let codeWithElement = code.unescape().replaceAll(/{%mapElement}/ig, element);

        const readCode = await d.reader.default(d, codeWithElement);

        if (readCode.result == undefined) readCode.result = '';

        mapResult.push(readCode.result);
    };

    return mapResult.join(sep);
};