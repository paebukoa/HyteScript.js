module.exports = async d => {
    let [index = '1', ...fields] = d.func.params.splits;

    if (isNaN(index) || Number(index) < 1 || !d.data.embeds[Number(index) - 1]) return d.throwError.invalid(d, 'index', index);

    for (const field of fields) {
        let [name, value, inline = 'false'] = field.split(":");

        d.data.embeds[Number(index) - 1] = d.data.embeds[Number(index) - 1]
        .addField(name, value, inline === 'true' ? true : false);
    }
    
};