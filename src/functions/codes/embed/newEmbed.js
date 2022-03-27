module.exports = async d => {
    let newEmbed = new d.djs.MessageEmbed();
    d.data.embeds.push(newEmbed);
};