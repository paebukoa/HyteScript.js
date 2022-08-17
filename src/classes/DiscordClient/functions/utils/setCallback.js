module.exports = {
    dontParse: [1],
    run: async d => {
        let [name, code] = d.function.parameters;
		 d.commandManager.callback.set(name.toLowerCase(), {code});
}
};