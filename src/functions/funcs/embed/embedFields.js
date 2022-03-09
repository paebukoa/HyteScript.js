module.exports = async d => {
    let [index, ...fields] = d.params.splits;

    if (isNaN(index) || Number(index) < 1 || !d.utils.embeds[Number(index) - 1]) return d.error.invalidError(d, 'index', index);

    for (let field in fields) {
        let [name, value, inline = "false"] = field.split(":");

        d.utils.embeds[Number(index) - 1].fields.push({name, value, inline: inline === "true" ? true : false});
    };
};