module.exports = async d => {
    let [property = 'id'] = d.function.parameters;

    return d.properties.user(d.author, property)
};