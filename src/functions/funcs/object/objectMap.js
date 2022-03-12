module.exports = async d => {
    let [functionalName, name = "default"] = d.params.splits;

    if (!d.utils.object[name]) return d.error.invalidError(d, 'object name', name);

    let functionalCmd = d.commands.functional.find(x => x.name.toLowerCase() === functionalName.toLowerCase());
    if (!functionalCmd) return d.error.invalidError(d, "functional command", functionalName);

    for (let item in d.utils.object[name]) {
        d.utils.elementName = item;
        d.utils.elementValue = d.utils.object[name][item];

        const readData = new d.reader((d), functionalCmd.code);

        d.utils = readData.utils;
    };
};