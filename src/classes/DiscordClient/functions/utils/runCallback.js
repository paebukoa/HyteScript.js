module.exports = async d => {
    let [name] = d.function.parameters;

    let callback = d.commandManager.callback.get(name.toLowerCase());
    if (!callback) return new d.error("invalid", d, 'callback name', name);

	return (await callback.code.parse(d)).result 
};