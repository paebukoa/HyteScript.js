module.exports = async d => {
    let [title, url, index] = d.inside.splits;

    if (isNaN(index) || Number(index) < 1) {
        d.error.set.newError(d, 'function', `Invalid embed index "${index}" provided.`);
        return;
    }

    d.embeds[Number(index) - 1].title = title;
    if (!url) return;
    d.embeds[Number(index) - 1].url = url;
}