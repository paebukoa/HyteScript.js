// dontParseParams

module.exports = {
        parseParams: false,
        run: async d => {
        let [code, sep = ',', name = 'default'] = d.func.params.splits;

        const parseName = await d.reader.default(d, name);
        if (parseName?.error) return;

        name = parseName.result;

        if (!d.data.objects[name]) return d.throwError.invalid(d, 'object name', name);

        let mapResult = [];

        for (const property in d.data.objects[name]) {
            let value = d.data.objects[name][property];
                
            let codeWithValues = code.unescape().replaceAll(/{%objProperty}/ig, property).replaceAll(/{%objValue}/ig, value);

            const readCode = await d.reader.default(d, codeWithValues);
            if (readCode.error) return;

            mapResult.push(readCode.result);
        }; 

        const parseSep = await d.reader.default(d, sep);
        if (parseSep?.error) return;

        sep = parseSep.result;
        
        return mapResult.join(sep);
    }
};