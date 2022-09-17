module.exports = {
    run: async (d, name) => {
        if (name == undefined) return new d.error('required', d, name)

        let callback = d.commandManager.callback.get(name.toLowerCase());
        if (!callback) return new d.error("invalid", d, 'callback name', name);

        return (await callback.code.parse(d)).result 
    }
};