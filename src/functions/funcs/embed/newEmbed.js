module.exports = async d => {
    let [returnIndex = "false"] = d.params.splits;

    if (d.utils.embeds.length >= 10) return d.error.functionError(d, `embeds limit exceeded.`);
    let embed = new d.djs.MessageEmbed();
    let newEmbedIndex = d.utils.embeds.push(embed);

    d.result = returnIndex === "true"? newEmbedIndex : undefined; 
};