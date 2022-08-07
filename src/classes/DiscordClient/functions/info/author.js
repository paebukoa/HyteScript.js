module.exports = async d => {
    let [property = 'id'] = d.function.parameters;

    return d.utils.getProperty('user', d.author, property)
};