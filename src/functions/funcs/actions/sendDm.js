module.exports = async d => {
	let [message, userId = d.author?.id, returnId = "false"] = d.params.splits;

	let user = d.client.users.cache.get(userId);
	if (!user) return d.error.invalidError(d, "user ID", userId);

	const utils = JSON.stringify(d.utils);

    const readData = new d.reader((d), message, true);

    d.utils = JSON.parse(utils);

    if (readData.err) return;


    let messageData = {
        content: d.prots.unescape(readData.result), 
        embeds: readData.utils.embeds
    };

    if (readData.result.replace('\n', '').trim() === '') mesageData = {
        embeds: readData.utils.embeds
    };

    if (JSON.stringify(readData.utils.embeds) === "[]" && readData.result.replace('\n', '').trim() === '') return;

    let newMessage = user.send(messageData);

    if (returnId === "true") d.result = newMessage.id;
}