module.exports = async d => {
    let [message, returnId] = d.inside.splits;
    d.message.channel.send(message);
    d.result = "";
}