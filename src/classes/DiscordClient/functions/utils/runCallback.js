const { clone } = require("../../utils/utils");

module.exports = {
    run: async (d, name) => {
        if (name == undefined) return new d.error('required', d, name)

        let callback = d.commandManager.callback.get(name.toLowerCase());
        if (!callback) return new d.error("invalid", d, 'callback name', name);

        let data = clone(d)
        
        if (callback.path != "<unknown>") {
            data.command = callback
            data.sourceCode = callback.code.source    
        }
        
        let parsedCode = await callback.code.parse(data)

        d.data = data.data
        
        return parsedCode.result
    }
};