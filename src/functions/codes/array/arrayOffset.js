module.exports = async d => {
    let [type, name = "default"] = d.func.params.splits;

    if (!d.data.arrays[name]) return d.throwError.invalid(d, 'array name', name);

    const types = {
        first() {
            return d.data.arrays[name].shift();
        },
        last() {
            return d.data.arrays[name].pop();
        }
    };

    let offsetedArrayElement = types[type];
    if (!offsetedArrayElement) return d.throwError.invalid(d, 'type', type);

    return offsetedArrayElement();
};