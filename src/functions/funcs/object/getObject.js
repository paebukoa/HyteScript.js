module.exports = async d => {
    let [format = 'false', name = 'default'] = d.params.splits;

    if (!d.utils.object[name]) return d.error.invalidError(d, 'object name', name);

    d.result = JSON.stringify(d.utils.object[name], null, format === "true"? 2 : 0);
};