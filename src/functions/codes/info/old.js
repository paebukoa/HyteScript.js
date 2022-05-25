module.exports = async d => {
    let [property = 'id'] = d.func.params.splits;

    let getProperty = d.properties[d.newType]
    if (!getProperty) return d.throwError.allow(d)

    return getProperty(d.old, property)
};