module.exports = {
    dontParse: [1],
    run: async (d, name, code) => {;
		 d.commandManager.callback.set(name.toLowerCase(), {code, name, path: "<unknown>"});
}
};