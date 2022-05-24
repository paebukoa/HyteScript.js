module.exports = async d => {
    let [property = 'id'] = d.func.params.splits;

    return d.properties.client(d.client, property)
}