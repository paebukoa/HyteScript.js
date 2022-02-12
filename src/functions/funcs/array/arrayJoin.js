module.exports = async d => {
    let [jointer = ",", name = "default"] = d.params.splits;
    
    if (!d.utils.array[name]) return d.error.functionError(d, `Array with name "${name}" not found!`);
    d.result = d.utils.array[name].join(jointer);
}