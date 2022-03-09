module.exports = async d => {
    let [functionalName, name = "default"] = d.params.splits;

    if (!d.utils.array[name]) return d.error.invalidError(d, "array name", name);
    
    let functionalCmd = d.commands.functional.find(x => x.name.toLowerCase() === functionalName.toLowerCase());
    if (!functionalCmd) return d.error.invalidError(d, "functional command", functionalName);

    d.utils.array[name].map(item => {
        d.utils.elementValue = item;

        const readData = new d.reader((d), functionalCmd.code);

        d.utils = readData.utils;
    });
};