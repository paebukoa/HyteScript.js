// dontParseParams

module.exports = async d => {
    let [code, sep = ',', name = 'default'] = d.func.params.splits;

    if (!d.data.objects[name]) return d.throwError.invalid(d, 'object name', name);

    let mapResult = [];

    for (const property in d.data.objects[name]) {
        let value = d.data.objects[name][property];
            
        let codeWithValues = code.unescape().replaceAll(/{%mapProperty}/ig, property).replaceAll(/{%mapValue}/ig, value);

        const readCode = await d.reader.default(d, codeWithValues);

        mapResult.push(readCode.result);
    }; 
    
    return mapResult.join(sep);
};