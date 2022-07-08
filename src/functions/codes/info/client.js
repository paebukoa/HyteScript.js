module.exports = async d => {
    let [property = 'id'] = d.function.parameters;

    return d.utils.getProperty('client', d.client, property)
}