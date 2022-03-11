module.exports = async d => {
	let [message, userId = d.author?.id, returnId = "false"] = d.params.splits;

	let user = d.client.users.cache.find(userId);
if (!user) return d.error.invalidError(d, "user ID", userId);

let newMessage = user.send(message);

	d.result = returnId === "true"? newMessage.id : undefined;
}