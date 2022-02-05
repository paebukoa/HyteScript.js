module.exports = async d => {
    let [title, ...url] = d.inside.splits;
    let index = url.pop();
    url = url.join("/");
    if (isNaN(index) || Number(index) < 1) {
        d.error.set.newError(d, 'function', `Invalid embed index "${index}" provided.`);
        return;
    }

    d.embeds[Number(index) - 1].setTitle(title);
    if (url && url.trim() !== "") {
        d.embeds[Number(index) - 1].setURL(url);
    }
}