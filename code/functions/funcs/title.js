const discordjs = require("discord.js");

module.exports = async d => {
    let [title, ...url] = d.inside.splits;
    let index = url.pop();
    if (!index) index = 1;
    url = url.join("/");
    if (isNaN(index) || Number(index) < 1) {
        d.error.set.newError(d, 'function', `Invalid embed index "${index}" provided.`);
        return;
    }
    let embed = d.embeds[Number(index) - 1];
    if (!embed) embed = {};

    embed.title = title;
    if (url && url.trim() !== "") {
        embed.url = url;
    }
    d.embeds[Number(index) - 1] = embed;
}